// backend/database/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta correcta a la base de datos
const dbPath = path.resolve(__dirname, 'database'); // Asumiendo que está en backend/database/database

console.log('Ruta de la base de datos:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error de conexión:', err.message);
  } else {
    console.log('✅ Conexión exitosa a SQLite');
    
    // Verificar si la tabla usuarios existe
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
      if (err) console.error('Error al obtener tablas:', err);
      else {
        console.log('Tablas existentes:', tables.map(t => t.name));
        
        if (tables.some(t => t.name === 'usuarios')) {
          // Verificar datos en usuarios
          db.all("SELECT * FROM usuarios", (err, rows) => {
            if (err) console.error('Error al obtener usuarios:', err);
            else console.log(`Usuarios en la base de datos: ${rows.length}`);
          });
        } else {
          console.error('❌ La tabla "usuarios" no existe');
        }
      }
    });
  }
});

module.exports = db;