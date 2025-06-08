// backend/controllers/usuarioController.js
const usuarioModel = require('../models/usuarioModel');

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.getAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// 🔽 Asegúrate de tener esta función exportada 🔽
exports.createUsuario = async (req, res) => { // <-- ¡Aquí está!
  try {
    const nuevoUsuario = await usuarioModel.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear usuario' });
  }
};