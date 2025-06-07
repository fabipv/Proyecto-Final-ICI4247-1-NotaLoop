const express = require('express');
const router = express.Router();
const asignaturaController = require('../controllers/asignaturaController');

router.get('/', asignaturaController.getAsignaturas);
router.get('/:id', asignaturaController.getAsignaturaById);
router.post('/', asignaturaController.createAsignatura);
router.put('/:id', asignaturaController.updateAsignatura);
router.delete('/:id', asignaturaController.deleteAsignatura);

module.exports = router;
