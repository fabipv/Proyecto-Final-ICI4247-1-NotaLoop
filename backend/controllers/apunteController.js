const apunteModel = require('../models/apunteModel');

// GET /api/apuntes - Obtener todos los apuntes
exports.getApuntes = async (req, res) => {
  try {
    const apuntes = await apunteModel.getAll();
    res.json(apuntes);
  } catch (error) {
    console.error("ERROR en getApuntes:", error); // ← línea nueva
    res.status(500).json({ error: 'Error al obtener apuntes' });
  }
};

// GET /api/apuntes/:id - Obtener apunte por ID
exports.getApunteById = async (req, res) => {
  try {
    const id = req.params.id;
    const apunte = await apunteModel.getById(id);
    if (!apunte) {
      return res.status(404).json({ error: 'Apunte no encontrado' });
    }
    res.json(apunte);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el apunte' });
  }
};

// POST /api/apuntes - Crear un nuevo apunte
exports.createApunte = async (req, res) => {
  try {
    const nuevoApunte = await apunteModel.create(req.body);
    res.status(201).json(nuevoApunte);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear apunte' });
  }
};

// PUT /api/apuntes/:id - Actualizar un apunte
exports.updateApunte = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await apunteModel.update(id, req.body);
    if (updated) {
      res.json({ message: 'Apunte actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'Apunte no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el apunte' });
  }
};

// DELETE /api/apuntes/:id - Eliminar un apunte
exports.deleteApunte = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await apunteModel.delete(id);
    if (deleted) {
      res.json({ message: 'Apunte eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Apunte no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el apunte' });
  }
};