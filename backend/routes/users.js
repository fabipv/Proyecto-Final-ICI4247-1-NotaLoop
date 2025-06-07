// backend/routes/users.js
const express = require('express');
const router = express.Router();

// Asegúrate que la ruta sea correcta
const usuarioController = require('../controllers/usuarioController');
// Verifica que las funciones existan
// Verificación de funciones
if (!usuarioController.createUsuario) {
  console.error('ERROR: createUsuario no está definido en usuarioController');
  console.log('Contenido de usuarioController:', usuarioController);
} else {
  console.log('createUsuario encontrado correctamente');
}

// ... resto del código
console.log('Funciones disponibles:', Object.keys(usuarioController));

router.get('/', usuarioController.getUsuarios);
router.post('/', usuarioController.createUsuario);  // Esta debería ser válida ahora

module.exports = router;