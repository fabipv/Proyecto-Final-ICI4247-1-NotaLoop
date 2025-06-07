require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../database/db');  // ✅ Importar conexión desde el módulo correcto

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

/* GET /ping route (para pruebas) */
router.get('/ping', (req, res) => {
  db.all('SELECT name FROM sqlite_master WHERE type="table"', (error, tables) => {
    if (error) {
      console.error('Error consultando tablas:', error);
      return res.status(500).json({ error: 'Error en base de datos' });
    }
    
    console.log('Tablas existentes:', tables);
    res.json({ status: 'online', tables });
  });
});

module.exports = router;