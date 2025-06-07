const express = require('express');
const router = express.Router();
const apunteController = require('../controllers/apunteController');

// Obtener todos los apuntes
router.get('/', apunteController.getApuntes);

// Obtener un apunte por ID
router.get('/:id', apunteController.getApunteById);

// Crear un nuevo apunte
router.post('/', apunteController.createApunte);

// Actualizar un apunte existente
router.put('/:id', apunteController.updateApunte);

// Eliminar un apunte
router.delete('/:id', apunteController.deleteApunte);

module.exports = router;
