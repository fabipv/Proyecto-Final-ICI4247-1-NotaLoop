// backend/models/recompensaModel.js
const db = require('../database/db');

module.exports = {
  getAll: () => new Promise((resolve, reject) => {
    db.all('SELECT * FROM recompensas', (err, rows) => {
      if (err) {
        console.error('Error en recompensaModel.getAll:', err); // Añadido log
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }),

  getById: (id) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM recompensas WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Error en recompensaModel.getById:', err); // Añadido log
        reject(err);
      } else {
        resolve(row);
      }
    });
  }),

  create: (recompensa) => new Promise((resolve, reject) => {
    db.run(
      // CAMBIADO 'puntos_necesarios' a 'puntos_requeridos'
      'INSERT INTO recompensas (nombre, descripcion, puntos_requeridos) VALUES (?, ?, ?)',
      [recompensa.nombre, recompensa.descripcion, recompensa.puntos_requeridos], // Asegúrate que el objeto 'recompensa' tenga 'puntos_requeridos'
      function (err) {
        if (err) {
          console.error('Error en recompensaModel.create:', err); // Añadido log
          reject(err);
        } else {
          resolve({ id: this.lastID, ...recompensa });
        }
      }
    );
  }),

  update: (id, recompensa) => new Promise((resolve, reject) => {
    db.run(
      // CAMBIADO 'puntos_necesarios' a 'puntos_requeridos'
      'UPDATE recompensas SET nombre = ?, descripcion = ?, puntos_requeridos = ? WHERE id = ?',
      [recompensa.nombre, recompensa.descripcion, recompensa.puntos_requeridos, id], // Asegúrate que el objeto 'recompensa' tenga 'puntos_requeridos'
      function (err) {
        if (err) {
          console.error('Error en recompensaModel.update:', err); // Añadido log
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      }
    );
  }),

  delete: (id) => new Promise((resolve, reject) => {
    db.run('DELETE FROM recompensas WHERE id = ?', [id], function (err) {
      if (err) {
        console.error('Error en recompensaModel.delete:', err); // Añadido log
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  }),
};