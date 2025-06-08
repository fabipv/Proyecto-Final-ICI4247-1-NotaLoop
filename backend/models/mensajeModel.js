// backend/models/mensajeModel.js
const db = require('../database/db');

module.exports = {
  getAll: () => new Promise((resolve, reject) => {
    db.all('SELECT * FROM mensajes', (err, rows) => {
      if (err) {
        console.error('Error en mensajeModel.getAll:', err); // Añadido log para depuración
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }),

  getById: (id) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM mensajes WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error('Error en mensajeModel.getById:', err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  }),

  create: (mensaje) => new Promise((resolve, reject) => {
    db.run(
      // CAMBIADO 'fecha_envio' a 'fecha'
      'INSERT INTO mensajes (contenido, remitente_id, destinatario_id, fecha, leido) VALUES (?, ?, ?, ?, ?)',
      [
        mensaje.contenido,
        mensaje.remitente_id,
        mensaje.destinatario_id,
        mensaje.fecha || new Date().toISOString(), // Usar 'fecha' de la tabla, con default
        mensaje.leido || 0
      ],
      function (err) {
        if (err) {
          console.error('Error en mensajeModel.create:', err); // Añadido log para depuración
          reject(err);
        } else {
          resolve({ id: this.lastID, ...mensaje });
        }
      }
    );
  }),

  update: (id, mensaje) => new Promise((resolve, reject) => {
    db.run(
      // CAMBIADO 'fecha_envio' a 'fecha' y ajustado campos para que coincidan con la tabla
      'UPDATE mensajes SET contenido = ?, remitente_id = ?, destinatario_id = ?, fecha = ?, leido = ? WHERE id = ?',
      [
        mensaje.contenido,
        mensaje.remitente_id,
        mensaje.destinatario_id,
        mensaje.fecha, // Asumimos que 'mensaje.fecha' ya viene formateada si se actualiza
        mensaje.leido,
        id
      ],
      function (err) {
        if (err) {
          console.error('Error en mensajeModel.update:', err);
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      }
    );
  }),

  delete: (id) => new Promise((resolve, reject) => {
    db.run('DELETE FROM mensajes WHERE id = ?', [id], function (err) {
      if (err) {
        console.error('Error en mensajeModel.delete:', err);
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  }),
};