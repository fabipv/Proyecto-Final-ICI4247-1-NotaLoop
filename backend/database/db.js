const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../tu_basededatos.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error('Error al conectar con la base de datos:', err);
  else console.log('Conexión exitosa a SQLite');
});

module.exports = db;