const mensajeModel = require('../models/mensajeModel');

exports.getMensajes = async (req, res) => {
  try {
    const mensajes = await mensajeModel.getAll();
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
};

exports.getMensajeById = async (req, res) => {
  try {
    const mensaje = await mensajeModel.getById(req.params.id);
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensaje' });
  }
};

exports.createMensaje = async (req, res) => {
  try {
    const nuevoMensaje = await mensajeModel.create(req.body);
    res.status(201).json(nuevoMensaje);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear mensaje' });
  }
};

exports.updateMensaje = async (req, res) => {
  try {
    const resultado = await mensajeModel.update(req.params.id, req.body);
    if (resultado.changes === 0) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json({ mensaje: 'Mensaje actualizado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar mensaje' });
  }
};

exports.deleteMensaje = async (req, res) => {
  try {
    const resultado = await mensajeModel.delete(req.params.id);
    if (resultado.changes === 0) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.json({ mensaje: 'Mensaje eliminado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar mensaje' });
  }
};
