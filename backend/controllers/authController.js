// backend/controllers/authController.js

const dbPromise = require('../database/db'); // Instancia de la Promesa de la base de datos SQLite
const bcrypt = require('bcryptjs'); // Para hashear y comparar contraseñas
const jwt = require('jsonwebtoken'); // Para generar y verificar JSON Web Tokens
const crypto = require('crypto'); // Módulo de Node.js para criptografía, usado para generar tokens seguros

// Importa el servicio de correo que creaste
const { sendRecoveryEmail } = require('../backend/services/emailService');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_very_strong_and_random'; // Secreto para JWT

// --- Función para Registrar un Nuevo Usuario ---
exports.register = async (req, res) => {
    const { nombre, rut, email, password, rol } = req.body;

    if (!nombre || !rut || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos requeridos (nombre, rut, email, password) son obligatorios.' });
    }

    try {
        const db = await dbPromise; // Obtén la instancia de la base de datos

        // 1. Verificar si el usuario ya existe (por email o RUT)
        const existingUser = await db.get('SELECT * FROM usuarios WHERE email = ? OR rut = ?', [email, rut]);
        console.log('Resultado de la consulta existingUser:', existingUser); 

        if (existingUser) {
            return res.status(409).json({ message: 'El correo electrónico o RUT ya está registrado.' });
        }

        // 2. Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const defaultRol = rol || 'estudiante'; // Rol por defecto si no se especifica
        
        console.log('Preparando para insertar usuario:', { nombre, rut, email, defaultRol });

        // 3. Insertar el nuevo usuario en la base de datos
        const result = await db.run(
            'INSERT INTO usuarios (nombre, rut, email, contrasena, rol, fecha_registro) VALUES (?, ?, ?, ?, ?, datetime("now"))',
            [nombre, rut, email, hashedPassword, defaultRol]
        );

        console.log('Resultado de la inserción (db.run):', result);
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.lastID });

    } catch (err) {
        console.error('Error al registrar usuario:', err.message);
        res.status(500).json({ message: 'Error interno del servidor al registrar usuario.' });
    }
};

// --- Función para Iniciar Sesión (Login) ---
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Correo electrónico y contraseña son obligatorios.' });
    }

    try {
        const db = await dbPromise; // Obtén la instancia de la base de datos

        // 1. Buscar el usuario por email
        const user = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas (usuario no encontrado).' });
        }

        // 2. Comparar la contraseña hasheada
        const isMatch = await bcrypt.compare(password, user.contrasena); 
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas (contraseña incorrecta).' });
        }

        // 3. Generar un JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email, rol: user.rol }, 
            JWT_SECRET,
            { expiresIn: '1h' } // Token expira en 1 hora
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token: token,
            user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol }
        });

    } catch (err) {
        console.error('Error al iniciar sesión:', err.message);
        res.status(500).json({ message: 'Error interno del servidor al iniciar sesión.' });
    }
};

// --- Función para solicitar recuperación de contraseña (Envío de correo) ---
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'El correo electrónico es obligatorio.' });
    }

    try {
        const db = await dbPromise; // Obtén la instancia de la base de datos

        // 1. Buscar al usuario por email
        // Solo selecciona id y email para evitar exponer datos innecesarios
        const user = await db.get('SELECT id, email FROM usuarios WHERE email = ?', [email]);

        // IMPORTANTE DE SEGURIDAD: Siempre devuelve un mensaje genérico
        // para no revelar si un correo existe o no en tu sistema.
        if (!user) {
            console.log(`Intento de recuperación para email no encontrado: ${email}`);
            return res.status(200).json({ message: 'Si el correo está registrado, se ha enviado un enlace para restablecer tu contraseña.' });
        }

        // 2. Generar un token de recuperación único y seguro
        const recoveryToken = crypto.randomBytes(32).toString('hex');
        const recoveryTokenExpires = Date.now() + 3600000; // Token válido por 1 hora (en milisegundos)

        // 3. Guardar el token y su expiración en la base de datos para el usuario
        // Asegúrate de que tu tabla 'usuarios' tenga las columnas:
        // 'resetPasswordToken' TEXT
        // 'resetPasswordExpires' INTEGER
        await db.run(
            'UPDATE usuarios SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE id = ?',
            [recoveryToken, recoveryTokenExpires, user.id]
        );
        console.log(`Token de recuperación generado y guardado para el usuario ${user.id}`);


        // 4. Construir el enlace de recuperación para el frontend
        // Usa una variable de entorno para la URL del frontend (definida en tu .env)
        const baseUrlFrontend = process.env.FRONTEND_URL || 'http://localhost:8100'; 
        const recoveryLink = `${baseUrlFrontend}/reset-password?token=${recoveryToken}`;

        // 5. Enviar el correo de recuperación
        const emailResult = await sendRecoveryEmail(user.email, recoveryLink);

        if (emailResult.success) {
            console.log(`Correo de recuperación enviado exitosamente a ${user.email}`);
            res.status(200).json({ message: 'Si el correo está registrado, se ha enviado un enlace para restablecer tu contraseña.' });
        } else {
            console.error('Fallo al enviar el correo de recuperación:', emailResult.message);
            // Si el envío falla, por seguridad, sigue dando el mensaje genérico.
            res.status(500).json({ message: 'Ocurrió un error al intentar enviar el correo de recuperación. Por favor, inténtalo de nuevo más tarde.' });
        }

    } catch (err) {
        console.error('Error en forgotPassword:', err.message);
        res.status(500).json({ message: 'Error interno del servidor al procesar la solicitud de recuperación.' });
    }
};

// --- Función para Restablecer la Contraseña (después de recibir el token del frontend) ---
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token y nueva contraseña son obligatorios.' });
    }

    try {
        const db = await dbPromise; // Obtén la instancia de la base de datos

        // 1. Buscar el usuario por el token de recuperación y verificar su expiración
        const user = await db.get(
            'SELECT id, resetPasswordExpires FROM usuarios WHERE resetPasswordToken = ?',
            [token]
        );

        if (!user || user.resetPasswordExpires < Date.now()) {
            console.log(`Intento de restablecimiento con token inválido o expirado. Token: ${token}`);
            // Mensaje genérico para tokens inválidos o expirados.
            return res.status(400).json({ message: 'El enlace para restablecer la contraseña es inválido o ha expirado. Por favor, solicita uno nuevo.' });
        }

        // 2. Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 3. Actualizar la contraseña del usuario y anular/limpiar el token de recuperación
        // Se establece resetPasswordToken a NULL y resetPasswordExpires a NULL
        // para invalidar el token después de su uso.
        await db.run(
            'UPDATE usuarios SET contrasena = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE id = ?',
            [hashedPassword, user.id]
        );
        console.log(`Contraseña actualizada para el usuario ${user.id} y token invalidado.`);


        res.status(200).json({ message: 'Tu contraseña ha sido restablecida exitosamente.' });

    } catch (err) {
        console.error('Error en resetPassword:', err.message);
        res.status(500).json({ message: 'Error interno del servidor al restablecer la contraseña.' });
    }
};