// backend/app.js

require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // <-- ¡Importación de CORS aquí!

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apuntesRouter = require('./routes/apuntes');
const asignaturasRouter = require('./routes/asignaturas');
const mensajesRouter = require('./routes/mensajes');
const recompensasRouter = require('./routes/recompensas');

var app = express(); // <-- ¡La instancia de Express se crea aquí!

// ***** CONFIGURACIÓN DE CORS (¡CRÍTICA PARA EL FUNCIONAMIENTO!) *****
// Esta configuración permite a tu frontend (http://localhost:8100) acceder a tu API.
// Debe ir ANTES de cualquier definición de tus rutas API.
app.use(cors({
  origin: 'http://localhost:8100', // El origen EXACTO de tu aplicación Ionic
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados que se pueden enviar
  credentials: true // Importante si manejas cookies o autenticación basada en sesión
}));
// *******************************************************************

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares generales
app.use(logger('dev')); // Logger para solicitudes HTTP
app.use(express.json()); // Middleware para parsear bodies JSON
app.use(express.urlencoded({ extended: false })); // Middleware para parsear bodies de URL-encoded
app.use(cookieParser()); // Middleware para parsear cookies
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta 'public'

// Definición de rutas de la API y rutas principales
app.use('/', indexRouter); // Ruta principal (generalmente para la página de inicio o documentación)
app.use('/api/usuarios', usersRouter); // Rutas para usuarios
app.use('/api/apuntes', apuntesRouter); // Rutas para apuntes
app.use('/api/asignaturas', asignaturasRouter); // Rutas para asignaturas
app.use('/api/mensajes', mensajesRouter); // Rutas para mensajes
app.use('/api/recompensas', recompensasRouter); // Rutas para recompensas

// Ruta de prueba (opcional)
app.get('/test', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Manejo de errores - 404 Not Found
// Captura errores 404 y los pasa al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores general
// Este middleware se encarga de formatear y enviar respuestas de error
app.use(function(err, req, res, next) {
  // Configura el mensaje de error y el error stack según el entorno
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la página de error o envía una respuesta JSON de error
  res.status(err.status || 500);
  res.render('error'); // Si estás usando Jade para errores
  // O para una API pura, podrías enviar: res.json({ error: err.message, status: err.status || 500 });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Define el puerto del servidor
app.listen(PORT, '0.0.0.0', () => { // Escucha en todas las interfaces de red
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app; // Exporta la instancia de la aplicación Express