// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
// POST /api/auth/register
// Espera en el body: { nombre, rut, email, password, rol (opcional) }
router.post('/register', authController.register);

// Ruta para iniciar sesión
// POST /api/auth/login
// Espera en el body: { email, password }
// Devuelve en el éxito: { message, token, user: { id, nombre, email, rol } }
router.post('/login', authController.login);

module.exports = router;