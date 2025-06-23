// backend/controllers/authController.js

const dbPromise = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// Asegúrate que la ruta a emailService es correcta. Si está en backend/services, debería ser:
// const { sendRecoveryEmail } = require('../services/emailService');
// Pero como la tienes ahora:
const { sendRecoveryEmail } = require('../backend/services/emailService'); // Mantén esta si funciona, si no, prueba la de arriba

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_very_strong_and_random';

// --- Función para Registrar un Nuevo Usuario ---
exports.register = async (req, res) => {
    // 1. Añade 'nombre_usuario' a la desestructuración del req.body
    const { nombre, rut, email, password, rol, apellidos, nombre_usuario } = req.body; // <-- ¡AÑADIDO 'nombre_usuario' aquí!

    // 2. Añade 'nombre_usuario' a la validación de campos obligatorios
    // (Asegúrate de que tu formulario envía 'nombre_usuario' o decide si es opcional)
    if (!nombre || !rut || !email || !password || !apellidos || !nombre_usuario) { // <-- ¡AÑADIDO '|| !nombre_usuario' aquí!
        return res.status(400).json({ message: 'Todos los campos requeridos (nombre, rut, email, password, apellidos, nombre de usuario) son obligatorios.' }); // <-- Mensaje actualizado
    }

    try {
        const db = await dbPromise;

        // 1. Verificar si el usuario ya existe (por email o RUT o nombre_usuario)
        // También deberías verificar por nombre_usuario si es UNIQUE en la DB
        const existingUser = await db.get('SELECT * FROM usuarios WHERE correo_electronico = ? OR rut = ? OR nombre_usuario = ?', [email, rut, nombre_usuario]); // <-- ¡AÑADIDO 'OR nombre_usuario = ?' aquí!
        console.log('Resultado de la consulta existingUser:', existingUser); 

        if (existingUser) {
            // Mensaje más específico para el usuario
            let errorMessage = 'El correo electrónico o RUT ya está registrado.';
            if (existingUser.correo_electronico === email) {
                errorMessage = 'El correo electrónico ya está registrado.';
            } else if (existingUser.rut === rut) {
                errorMessage = 'El RUT ya está registrado.';
            } else if (existingUser.nombre_usuario === nombre_usuario) {
                errorMessage = 'El nombre de usuario ya está en uso.';
            }
            return res.status(409).json({ message: errorMessage });
        }

        // 2. Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const defaultRol = rol || 'estudiante';

        console.log('Preparando para insertar usuario:', { nombre, rut, email, defaultRol, apellidos, nombre_usuario }); // <-- ¡AÑADIDO 'apellidos, nombre_usuario' aquí!

        // 3. Insertar el nuevo usuario en la base de datos
        // 3a. Añade 'nombre_usuario' a la lista de columnas en la consulta INSERT
        // 3b. Añade '?' para su valor en la parte de VALUES
        // 3c. Añade la variable 'nombre_usuario' al array de valores
        const result = await db.run(
            'INSERT INTO usuarios (nombre, apellidos, rut, correo_electronico, contrasena, rol, nombre_usuario, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, datetime("now"))', // <-- ¡AÑADIDO 'nombre_usuario' y un '?' aquí!
            [nombre, apellidos, rut, email, hashedPassword, defaultRol, nombre_usuario] // <-- ¡AÑADIDO 'nombre_usuario' aquí!
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
        const db = await dbPromise;

        // 1. Buscar el usuario por email
        // CAMBIO AQUÍ: 'email' por 'correo_electronico'
        const user = await db.get('SELECT * FROM usuarios WHERE correo_electronico = ?', [email]);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas (usuario no encontrado).' });
        }

        // 2. Comparar la contraseña hasheada
        const isMatch = await bcrypt.compare(password, user.contrasena);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas (contraseña incorrecta).' });
        }

        // 3. Generar un JWT
        // CAMBIO AQUÍ: user.email por user.correo_electronico
        const token = jwt.sign(
            { userId: user.id, email: user.correo_electronico, rol: user.rol }, // Se usa user.correo_electronico que es el nombre de la columna en la DB
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token: token,
            // CAMBIO AQUÍ: user.email por user.correo_electronico
            user: { id: user.id, nombre: user.nombre, email: user.correo_electronico, rol: user.rol }
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
        const db = await dbPromise;

        // 1. Buscar al usuario por email
        // CAMBIO AQUÍ: 'email' por 'correo_electronico' en SELECT y WHERE
        const user = await db.get('SELECT rut, correo_electronico FROM usuarios WHERE correo_electronico = ?', [email]);

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
        await db.run(
            'UPDATE usuarios SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE rut = ?',
            [recoveryToken, recoveryTokenExpires, user.id]
        );
        console.log(`Token de recuperación generado y guardado para el usuario ${user.rut}`);

        // 4. Construir el enlace de recuperación para el frontend
        const baseUrlFrontend = process.env.FRONTEND_URL || 'http://localhost:8100';
        const recoveryLink = `${baseUrlFrontend}/reset-password?token=${recoveryToken}`;

        // 5. Enviar el correo de recuperación
        // CAMBIO AQUÍ: user.email por user.correo_electronico
        const emailResult = await sendRecoveryEmail(user.correo_electronico, recoveryLink);

        if (emailResult.success) {
            console.log(`Correo de recuperación enviado exitosamente a ${user.correo_electronico}`);
            res.status(200).json({ message: 'Si el correo está registrado, se ha enviado un enlace para restablecer tu contraseña.' });
        } else {
            console.error('Fallo al enviar el correo de recuperación:', emailResult.message);
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
        const db = await dbPromise;

        // 1. Buscar el usuario por el token de recuperación y verificar su expiración
        const user = await db.get(
            'SELECT rut, resetPasswordExpires FROM usuarios WHERE resetPasswordToken = ?',
            [token]
        );

        if (!user || user.resetPasswordExpires < Date.now()) {
            console.log(`Intento de restablecimiento con token inválido o expirado. Token: ${token}`);
            return res.status(400).json({ message: 'El enlace para restablecer la contraseña es inválido o ha expirado. Por favor, solicita uno nuevo.' });
        }

        // 2. Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 3. Actualizar la contraseña del usuario y anular/limpiar el token de recuperación
        await db.run(
            'UPDATE usuarios SET contrasena = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE rut = ?',
            [hashedPassword, user.rut] // <--- Cambiado de user.id o user.id_usuario a user.rut
        );
        console.log(`Contraseña actualizada para el usuario con RUT ${user.rut} y token invalidado.`);

        res.status(200).json({ message: 'Tu contraseña ha sido restablecida exitosamente.' });

    } catch (err) {
        console.error('Error en resetPassword:', err.message);
        res.status(500).json({ message: 'Error interno del servidor al restablecer la contraseña.' });
    }
};