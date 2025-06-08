// backend/models/usuarioModel.js
const db = require('../database/db'); // Asegúrate que esta ruta sea correcta

module.exports = {
  // Obtener todos los usuarios
  getAll: () => new Promise((resolve, reject) => {
    db.all('SELECT * FROM usuarios', (err, rows) => { // <-- DEBE SER 'usuarios'
      if (err) {
        console.error('Error en usuarioModel.getAll:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }),

  // Obtener un usuario por ID
  getById: (id) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => { // <-- DEBE SER 'usuarios'
      if (err) {
        console.error('Error en usuarioModel.getById:', err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  }),

  // Crear un nuevo usuario
  create: (usuario) => new Promise((resolve, reject) => {
    // Asegúrate de que los nombres de las columnas coincidan exactamente con tu tabla 'usuarios'
    db.run(
      'INSERT INTO usuarios (rut, nombre, email, contrasena, rol, puntos, estado, titulo_academico, biografia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        usuario.rut,
        usuario.nombre,
        usuario.email,
        usuario.contrasena,
        usuario.rol || 'estudiante',
        usuario.puntos || 0,
        usuario.estado || 'activo',
        usuario.titulo_academico,
        usuario.biografia
      ],
      function (err) {
        if (err) {
          console.error('Error en usuarioModel.create:', err);
          reject(err);
        } else {
          resolve({ id: this.lastID, ...usuario });
        }
      }
    );
  }),

  // Actualizar un usuario existente
  update: (id, usuario) => new Promise((resolve, reject) => {
    db.run(
      'UPDATE usuarios SET rut = ?, nombre = ?, email = ?, contrasena = ?, rol = ?, puntos = ?, estado = ?, titulo_academico = ?, biografia = ? WHERE id = ?',
      [
        usuario.rut,
        usuario.nombre,
        usuario.email,
        usuario.contrasena,
        usuario.rol,
        usuario.puntos,
        usuario.estado,
        usuario.titulo_academico,
        usuario.biografia,
        id
      ],
      function (err) {
        if (err) {
          console.error('Error en usuarioModel.update:', err);
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      }
    );
  }),

  // Eliminar un usuario
  delete: (id) => new Promise((resolve, reject) => {
    db.run('DELETE FROM usuarios WHERE id = ?', [id], function (err) { // <-- DEBE SER 'usuarios'
      if (err) {
        console.error('Error en usuarioModel.delete:', err);
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  }),
};