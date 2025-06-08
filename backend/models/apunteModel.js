// backend/models/apunteModel.js
const db = require('../database/db');

module.exports = {
  // Obtener todos los apuntes
  getAll: () => new Promise((resolve, reject) => {
    db.all('SELECT * FROM apuntes', (err, rows) => {
      if (err) {
        console.error('Error en apunteModel.getAll:', err); // Añadido log
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }),

  // Obtener un apunte por ID
  getById: (id) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM apuntes WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Error en apunteModel.getById:', err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  }),

  // Crear un nuevo apunte
  create: (apunte) => new Promise((resolve, reject) => {
    // Asegúrate de que los nombres de las columnas y el orden coincidan con tu tabla
    db.run(
      'INSERT INTO apuntes (titulo, descripcion, archivo, estado, categoria, usuario_id, asignatura_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        apunte.titulo,
        apunte.descripcion,
        apunte.archivo,
        apunte.estado || 'pendiente', // Valor por defecto
        apunte.categoria,
        apunte.usuario_id,
        apunte.asignatura_id
      ],
      function (err) {
        if (err) {
          console.error('Error en apunteModel.create:', err); // Log detallado
          reject(err);
        } else {
          resolve({ id: this.lastID, ...apunte });
        }
      }
    );
  }),

  // Actualizar un apunte existente
  update: (id, apunte) => new Promise((resolve, reject) => {
    db.run(
      'UPDATE apuntes SET titulo = ?, descripcion = ?, archivo = ?, estado = ?, categoria = ?, usuario_id = ?, asignatura_id = ? WHERE id = ?',
      [
        apunte.titulo,
        apunte.descripcion,
        apunte.archivo,
        apunte.estado,
        apunte.categoria,
        apunte.usuario_id,
        apunte.asignatura_id,
        id
      ],
      function (err) {
        if (err) {
          console.error('Error en apunteModel.update:', err);
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      }
    );
  }),

  // Eliminar un apunte
  delete: (id) => new Promise((resolve, reject) => {
    db.run('DELETE FROM apuntes WHERE id = ?', [id], function (err) {
      if (err) {
        console.error('Error en apunteModel.delete:', err);
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  }),
};