// backend/models/usuarioModel.js
const db = require('../database/db');

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM usuarios', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  
  // 🔽 Asegúrate de tener esta función 🔽
  create: (usuario) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO usuarios (rut, nombre, email, contrasena, rol) VALUES (?, ?, ?, ?, ?)`,
        [usuario.rut, usuario.nombre, usuario.email, usuario.contrasena, usuario.rol],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  }
};