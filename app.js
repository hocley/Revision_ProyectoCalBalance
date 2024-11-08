const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');

const app = express();

// Configuración del middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api', foodRoutes); // Asocia todas las rutas de foodRoutes al prefijo /api

// Configuración de la sesión
app.use(session({
    secret: 'mi_secreto', // Cambia esto por una clave segura
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 } // Duración de la sesión en milisegundos (10 minutos)
}));

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Cambia esto por tu usuario de MySQL
    password: 'root',   // Cambia esto por tu contraseña de MySQL
    database: 'calbalance'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
