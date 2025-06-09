// backend/database/db.js
// Importa el paquete 'sqlite' y 'sqlite3' como driver
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

// Ruta al archivo de la base de datos
const DB_FILE_NAME = 'database.db'; // Asegúrate que este sea el nombre de tu archivo DB
const dbPath = path.resolve(__dirname, DB_FILE_NAME);

let dbInstance; // Variable para almacenar la instancia de la base de datos (singleton)

async function initializeDatabase() {
    try {
        // Abrir la base de datos usando el paquete 'sqlite'
        dbInstance = await sqlite.open({
            filename: dbPath,
            driver: sqlite3.Database // Especificamos que use el driver sqlite3
        });
        console.log(`✅ Conexión exitosa a SQLite: ${DB_FILE_NAME}`);

        // Habilitar el soporte de claves foráneas (buena práctica para integridad de datos)
        await dbInstance.run("PRAGMA foreign_keys = ON;");

        // Definición del esquema de la tabla 'usuarios'
        // Esta es la tabla que tus controladores esperan
        await dbInstance.run(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                rut TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                contrasena TEXT NOT NULL,
                rol TEXT NOT NULL DEFAULT 'estudiante', -- Rol por defecto
                puntos INTEGER DEFAULT 0, -- Puntos por defecto
                fecha_registro TEXT NOT NULL -- Formato de texto para fecha/hora
            );
        `);
        console.log('Tabla "usuarios" verificada/creada.');

        // Opcional: Verificar usuarios existentes al inicio
        const rows = await dbInstance.all("SELECT * FROM usuarios");
        console.log(`Usuarios existentes al inicio: ${rows.length}`);

        return dbInstance; // Devuelve la instancia de la base de datos
    } catch (err) {
        console.error('❌ Error al inicializar la base de datos:', err.message);
        process.exit(1); // Si hay un error crítico al conectar/inicializar, salir.
    }
}

// Exportar una Promise que resuelva con la instancia de la base de datos
// Esto permite que los módulos que requieran 'db' esperen a que la DB esté lista.
module.exports = (async () => {
    // Si la instancia ya existe, la devuelve; de lo contrario, la inicializa.
    if (!dbInstance) {
        return await initializeDatabase();
    }
    return dbInstance;
})();