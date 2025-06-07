const db = require('../database/db');

module.exports = {
  getAll: () => new Promise((resolve, reject) => {
    db.all('SELECT * FROM apuntes', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  })
};