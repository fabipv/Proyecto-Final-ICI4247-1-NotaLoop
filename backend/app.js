require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const apuntesRouter = require('./routes/apuntes');
// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/apuntes', apuntesRouter);
// Rutas
app.use('/', indexRouter);
app.use('/api/usuarios', usersRouter); // Modificado para usar /api/usuarios
const asignaturasRouter = require('./routes/asignaturas');
app.use('/api/asignaturas', asignaturasRouter);
const mensajesRouter = require('./routes/mensajes');
app.use('/api/mensajes', mensajesRouter);
const recompensasRouter = require('./routes/recompensas');
app.use('/api/recompensas', recompensasRouter);

// Ruta de prueba
app.get('/test', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Manejo de errores
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app;