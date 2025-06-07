const recompensaModel = require('../models/recompensaModel');

exports.getRecompensas = async (req, res) => {
  try {
    const recompensas = await recompensaModel.getAll();
    res.json(recompensas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener recompensas' });
  }
};

exports.getRecompensaById = async (req, res) => {
  try {
    const recompensa = await recompensaModel.getById(req.params.id);
    if (!recompensa) return res.status(404).json({ error: 'Recompensa no encontrada' });
    res.json(recompensa);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener recompensa' });
  }
};

exports.createRecompensa = async (req, res) => {
  try {
    const nuevaRecompensa = await recompensaModel.create(req.body);
    res.status(201).json(nuevaRecompensa);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear recompensa' });
  }
};

exports.updateRecompensa = async (req, res) => {
  try {
    const resultado = await recompensaModel.update(req.params.id, req.body);
    if (resultado.changes === 0) return res.status(404).json({ error: 'Recompensa no encontrada' });
    res.json({ mensaje: 'Recompensa actualizada' });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar recompensa' });
  }
};

exports.deleteRecompensa = async (req, res) => {
  try {
    const resultado = await recompensaModel.delete(req.params.id);
    if (resultado.changes === 0) return res.status(404).json({ error: 'Recompensa no encontrada' });
    res.json({ mensaje: 'Recompensa eliminada' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar recompensa' });
  }
};
