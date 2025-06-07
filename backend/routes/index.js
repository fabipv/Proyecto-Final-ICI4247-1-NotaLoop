var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expresso' });
});

/* GET /ping route. */
router.get('/ping', function(req, res, next) {
   db.all(`SELECT name FROM sqlite_master WHERE type='table'`, [], (err, tables) => {
    if (err) {
      console.error('Error consultando tablas:', err);
      return res.status(500).json({ error: 'Error al obtener las tablas' });
    }
    console.log('Tablas existentes:', tables);
    
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
      res.json(rows);
    });
  });
});

module.exports = router;
