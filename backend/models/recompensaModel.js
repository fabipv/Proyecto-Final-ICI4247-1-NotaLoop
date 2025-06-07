const db = require('../database/db');

module.exports = {
  getAll: () => new Promise((resolve, reject) => {
    db.all('SELECT * FROM recompensas', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  }),

  getById: (id) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM recompensas WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  }),

  create: (recompensa) => new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO recompensas (nombre, descripcion, puntos_necesarios) VALUES (?, ?, ?)',
      [recompensa.nombre, recompensa.descripcion, recompensa.puntos_necesarios],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  }),

  update: (id, recompensa) => new Promise((resolve, reject) => {
    db.run(
      'UPDATE recompensas SET nombre = ?, descripcion = ?, puntos_necesarios = ? WHERE id = ?',
      [recompensa.nombre, recompensa.descripcion, recompensa.puntos_necesarios, id],
      function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  }),

  delete: (id) => new Promise((resolve, reject) => {
    db.run('DELETE FROM recompensas WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  }),
};
