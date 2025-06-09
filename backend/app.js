// backend/app.js

require('dotenv').config(); // Carga las variables de entorno desde un archivo .env
var createError = require('http-errors'); // Para crear errores HTTP (como 404)
var express = require('express'); // El framework Express
var path = require('path'); // Utilidad para manejar rutas de archivos
var cookieParser = require('cookie-parser'); // Middleware para parsear cookies
var logger = require('morgan'); // Middleware de logging para solicitudes HTTP
var cors = require('cors'); // Middleware para habilitar Cross-Origin Resource Sharing (CORS)

// --- Importación de Routers ---
// Importa todos los módulos de rutas que manejarán tus endpoints API
var indexRouter = require('./routes/index');
var usersRouter = require('././routes/users');
const apuntesRouter = require('./routes/apuntes');
const asignaturasRouter = require('./routes/asignaturas');
const mensajesRouter = require('./routes/mensajes');
const recompensasRouter = require('./routes/recompensas');
var authRouter = require('./routes/auth'); // ¡Tu router de autenticación!

var app = express(); // Inicializa la aplicación Express

// ***** CONFIGURACIÓN DE CORS (¡CRÍTICA PARA EL FUNCIONAMIENTO!) *****
// Este middleware DEBE ir ANTES de cualquier definición de tus rutas API.
// Permite que tu frontend de Ionic (http://localhost:8100) acceda a tu API.
app.use(cors({
  origin: 'http://localhost:8100', // Define el origen exacto permitido para las solicitudes
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados HTTP permitidos en las solicitudes
  credentials: true // Permite el envío de cookies y encabezados de autenticación (si se usan)
}));
// *******************************************************************

// --- Configuración del Motor de Vistas ---
// Establece el directorio de las vistas y el motor de plantillas (Jade en tu caso)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// --- Middlewares Generales de Express ---
// Estos middlewares se aplican a todas las solicitudes entrantes
app.use(logger('dev')); // Registra las solicitudes HTTP en la consola
app.use(express.json()); // Parsea los cuerpos de solicitud con formato JSON
app.use(express.urlencoded({ extended: false })); // Parsea los cuerpos de solicitud con datos URL-encoded
app.use(cookieParser()); // Parsea las cookies del encabezado de la solicitud
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta 'public'

app.get('/prueba-ruta', (req, res) => {
  res.send('¡Ruta de prueba alcanzada con éxito!');
});

// --- Definición de Rutas de la API y Rutas Principales ---
// El orden de estas rutas es importante: se procesan secuencialmente.
// La ruta de autenticación se coloca generalmente al principio de las API.
app.use('/api/auth', authRouter); // Rutas para autenticación (login, register)

// Otras rutas específicas de tu API
app.use('/api/usuarios', usersRouter); // Rutas para la gestión de usuarios
app.use('/api/apuntes', apuntesRouter); // Rutas para la gestión de apuntes
app.use('/api/asignaturas', asignaturasRouter); // Rutas para la gestión de asignaturas
app.use('/api/mensajes', mensajesRouter); // Rutas para la gestión de mensajes
app.use('/api/recompensas', recompensasRouter); // Rutas para la gestión de recompensas

// Ruta principal (ej. para la página de inicio o documentación general del API)
app.use('/', indexRouter);


// --- Ruta de Prueba (Opcional) ---
// Un endpoint simple para verificar que el servidor está funcionando
app.get('/test', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// --- Manejo de Errores - 404 Not Found ---
// Este middleware se ejecuta si ninguna ruta anterior ha manejado la solicitud,
// indicando que el recurso solicitado no fue encontrado.
app.use(function(req, res, next) { // <-- ¡Esta es la línea 73 que te marca el error ahora!
  next(createError(404));
});

// --- Manejador de Errores General ---
// Este middleware final captura cualquier error que ocurra en la aplicación
// y genera una respuesta de error adecuada.
app.use(function(err, req, res, next) {
  // Configura el mensaje de error y el stack de error según el entorno (desarrollo vs producción)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Establece el código de estado HTTP y renderiza la vista de error
  res.status(err.status || 500);
  res.render('error'); // Renderiza la plantilla 'error.jade'
  // Si tu API es puramente JSON, podrías enviar:
  // res.json({ error: err.message, status: err.status || 500 });
});

// --- Iniciar el Servidor ---
// Define el puerto del servidor (usa la variable de entorno PORT o 3000 por defecto)
const PORT = process.env.PORT || 3000;
// Inicia el servidor para escuchar en el puerto especificado en todas las interfaces de red
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app; // Exporta la instancia de la aplicación Express para su uso en bin/www