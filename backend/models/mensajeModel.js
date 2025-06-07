const db = require('../database/db');

module.exports = {
  getAll: () => new Promise((resolve, reject) => {
    db.all('SELECT * FROM mensajes', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  }),

  getById: (id) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM mensajes WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  }),

  create: (mensaje) => new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO mensajes (contenido, usuario_id, fecha_envio) VALUES (?, ?, ?)',
      [mensaje.contenido, mensaje.usuario_id, mensaje.fecha_envio],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  }),

  update: (id, mensaje) => new Promise((resolve, reject) => {
    db.run(
      'UPDATE mensajes SET contenido = ?, usuario_id = ?, fecha_envio = ? WHERE id = ?',
      [mensaje.contenido, mensaje.usuario_id, mensaje.fecha_envio, id],
      function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  }),

  delete: (id) => new Promise((resolve, reject) => {
    db.run('DELETE FROM mensajes WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  }),
};
