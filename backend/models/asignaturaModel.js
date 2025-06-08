// backend/models/asignaturaModel.js
const db = require('../database/db');

module.exports = {
  getAll: () => new Promise((resolve, reject) => {
    db.all('SELECT * FROM asignaturas', (err, rows) => {
      if (err) {
        console.error('Error en asignaturaModel.getAll:', err); // Añadido log para depuración
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }),

  getById: (id) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM asignaturas WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Error en asignaturaModel.getById:', err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  }),

  create: (asignatura) => new Promise((resolve, reject) => {
    // Se agregan 'codigo' y 'profesor_id' a la sentencia INSERT
    db.run(
      'INSERT INTO asignaturas (nombre, codigo, profesor_id) VALUES (?, ?, ?)',
      [
        asignatura.nombre,
        asignatura.codigo,       // Asegúrate de que este valor se pase en el body de la petición
        asignatura.profesor_id   // Asegúrate de que este valor se pase en el body de la petición (puede ser null)
      ],
      function (err) {
        if (err) {
          console.error('Error en asignaturaModel.create:', err); // Log detallado
          reject(err);
        } else {
          resolve({ id: this.lastID, ...asignatura });
        }
      }
    );
  }),

  update: (id, asignatura) => new Promise((resolve, reject) => {
    // Se agregan 'codigo' y 'profesor_id' al UPDATE
    db.run(
      'UPDATE asignaturas SET nombre = ?, codigo = ?, profesor_id = ? WHERE id = ?',
      [asignatura.nombre, asignatura.codigo, asignatura.profesor_id, id],
      function (err) {
        if (err) {
          console.error('Error en asignaturaModel.update:', err);
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      }
    );
  }),

  delete: (id) => new Promise((resolve, reject) => {
    db.run('DELETE FROM asignaturas WHERE id = ?', [id], function (err) {
      if (err) {
        console.error('Error en asignaturaModel.delete:', err);
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  }),
};