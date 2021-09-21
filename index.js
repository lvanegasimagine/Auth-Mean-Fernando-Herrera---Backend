const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Crear el servidor/aplicattion
const app = express();

// Base de Datos
dbConnection();

// Directorio Publico
app.use(express.static('public'));

// Cors!
app.use(cors());

// Lectura y parseo del body!
app.use(express.json());

// Rutas!

app.use('/api/auth', require('./routes/auth'));

const port = process.env.PORT || 5000;

app.listen(port , () => console.log('> Server is up and running on port : ' + port));