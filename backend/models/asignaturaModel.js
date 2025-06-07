const db = require('../database/db');

module.exports = {
  getAll: () => new Promise((resolve, reject) => {
    db.all('SELECT * FROM asignaturas', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  }),

  getById: (id) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM asignaturas WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  }),

  create: (asignatura) => new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO asignaturas (nombre) VALUES (?)',
      [asignatura.nombre],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  }),

  update: (id, asignatura) => new Promise((resolve, reject) => {
    db.run(
      'UPDATE asignaturas SET nombre = ? WHERE id = ?',
      [asignatura.nombre, id],
      function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  }),

  delete: (id) => new Promise((resolve, reject) => {
    db.run('DELETE FROM asignaturas WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  }),
};
