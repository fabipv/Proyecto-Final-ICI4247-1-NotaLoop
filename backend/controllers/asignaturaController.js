const asignaturaModel = require('../models/asignaturaModel');

exports.getAsignaturas = async (req, res) => {
  try {
    const asignaturas = await asignaturaModel.getAll();
    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener asignaturas' });
  }
};

exports.getAsignaturaById = async (req, res) => {
  try {
    const asignatura = await asignaturaModel.getById(req.params.id);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.json(asignatura);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la asignatura' });
  }
};

exports.createAsignatura = async (req, res) => {
  try {
    const nuevaAsignatura = await asignaturaModel.create(req.body);
    res.status(201).json(nuevaAsignatura);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear asignatura' });
  }
};

exports.updateAsignatura = async (req, res) => {
  try {
    const resultado = await asignaturaModel.update(req.params.id, req.body);
    if (resultado.changes === 0) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.json({ mensaje: 'Asignatura actualizada' });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar asignatura' });
  }
};

exports.deleteAsignatura = async (req, res) => {
  try {
    const resultado = await asignaturaModel.delete(req.params.id);
    if (resultado.changes === 0) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.json({ mensaje: 'Asignatura eliminada' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar asignatura' });
  }
};
