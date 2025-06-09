// backend/controllers/authController.js
const dbPromise = require('../database/db'); // <-- Ahora esto es una Promesa de la instancia de DB
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_very_strong_and_random';

// --- Función para Registrar un Nuevo Usuario ---
exports.register = async (req, res) => {
    const { nombre, rut, email, password, rol } = req.body;

    if (!nombre || !rut || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos requeridos (nombre, rut, email, password) son obligatorios.' });
    }

    try {
        const db = await dbPromise; // <-- ¡OBTÉN LA INSTANCIA DE DB AQUÍ!

        // 1. Verificar si el usuario ya existe (por email o RUT)
        const existingUser = await db.get('SELECT * FROM usuarios WHERE email = ? OR rut = ?', [email, rut]);
        console.log('Resultado de la consulta existingUser:', existingUser); 

        if (existingUser) {
            return res.status(409).json({ message: 'El correo electrónico o RUT ya está registrado.' });
        }

        // 2. Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const defaultRol = rol || 'estudiante'; 
        
        console.log('Preparando para insertar usuario:', { nombre, rut, email, defaultRol });

        // 3. Insertar el nuevo usuario en la base de datos
        // db.run ahora devolverá un objeto con .lastID y .changes
        const result = await db.run(
            'INSERT INTO usuarios (nombre, rut, email, contrasena, rol, fecha_registro) VALUES (?, ?, ?, ?, ?, datetime("now"))',
            [nombre, rut, email, hashedPassword, defaultRol]
        );

        console.log('Resultado de la inserción (db.run):', result);
        // Ahora result.lastID debería estar disponible
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
        const db = await dbPromise; // <-- ¡OBTÉN LA INSTANCIA DE DB AQUÍ TAMBIÉN!

        // 1. Buscar el usuario por email
        const user = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas (usuario no encontrado).' });
        }

        // 2. Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.contrasena); 
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas (contraseña incorrecta).' });
        }

        // 3. Generar un JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email, rol: user.rol }, 
            JWT_SECRET,
            { expiresIn: '1h' } 
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