const express = require('express');
const router = express.Router();
const recompensaController = require('../controllers/recompensaController');

router.get('/', recompensaController.getRecompensas);
router.get('/:id', recompensaController.getRecompensaById);
router.post('/', recompensaController.createRecompensa);
router.put('/:id', recompensaController.updateRecompensa);
router.delete('/:id', recompensaController.deleteRecompensa);

module.exports = router;
