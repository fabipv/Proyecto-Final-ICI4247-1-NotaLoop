const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');

router.get('/', mensajeController.getMensajes);
router.get('/:id', mensajeController.getMensajeById);
router.post('/', mensajeController.createMensaje);
router.put('/:id', mensajeController.updateMensaje);
router.delete('/:id', mensajeController.deleteMensaje);

module.exports = router;
