// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importa tu controlador de autenticación

// Ruta para registrar un nuevo usuario
// POST /api/auth/register
// Espera en el body: { nombre, rut, email, password, rol (opcional) }
router.post('/register', authController.register);

// Ruta para iniciar sesión
// POST /api/auth/login
// Espera en el body: { email, password }
// Devuelve en el éxito: { message, token, user: { id, nombre, email, rol } }
router.post('/login', authController.login);

// --- NUEVAS RUTAS PARA RECUPERACIÓN DE CONTRASEÑA ---

// Ruta para solicitar el envío del correo de recuperación
// POST /api/auth/forgot-password
// Espera en el body: { email }
router.post('/forgot-password', authController.forgotPassword);

// Ruta para restablecer la contraseña usando el token
// POST /api/auth/reset-password
// Espera en el body: { token, newPassword }
router.post('/reset-password', authController.resetPassword);

module.exports = router;