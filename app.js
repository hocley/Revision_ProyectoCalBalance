const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Configuración del middleware
app.use(express.json()); // Middleware para parsear JSON
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Configuración de la sesión
app.use(session({
    secret: 'mi_secreto', // Cambia esto por una clave segura
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 } // Tiempo de duración de la sesión en milisegundos (10 minutos)
}));

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Cambia esto por tu usuario de MySQL
    password: 'root',   // Cambia esto por tu contraseña de MySQL
    database: 'calbalance'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para el registro de usuario
app.post('/api/users/register', (req, res) => {
    const { name, email, age, gender, height, activity_level, password } = req.body;

    // Inserta los datos en la tabla de usuarios
    const sql = `INSERT INTO usuarios (nombre_completo, correo, edad, genero, altura, nivel_actividad, password)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, email, age, gender, height, activity_level, password], (err, result) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            return res.status(500).send('Error al registrar el usuario');
        }

        // Iniciar sesión para el usuario registrado
        req.session.user = {
            id: result.insertId,
            name: name,
            email: email
        };
        console.log('Usuario registrado y sesión iniciada:', req.session.user);

        res.redirect('/index.html'); // Redirigir a la página principal después del registro
    });
});

// Ruta para el inicio de sesión
app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;

    // Consulta para verificar las credenciales del usuario
    const sql = `SELECT * FROM usuarios WHERE correo = ? AND password = ?`;
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            return res.status(500).send('Error al iniciar sesión');
        }

        if (results.length > 0) {
            // Credenciales válidas, iniciar sesión
            req.session.user = {
                id: results[0].id,
                name: results[0].nombre_completo,
                email: results[0].correo
            };
            console.log('Sesión iniciada para el usuario:', req.session.user);

            res.redirect('/historial.html'); // Redirigir a la página de historial después de iniciar sesión
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    });
});

// Ruta para verificar la sesión del usuario
app.get('/api/users/perfil', (req, res) => {
    if (req.session.user) {
        res.send(`Bienvenido ${req.session.user.name}, estás en tu perfil`);
    } else {
        res.status(401).send('No has iniciado sesión');
    }
});

// Ruta para cerrar sesión
app.get('/api/users/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar la sesión');
        }
        res.redirect('/index.html'); // Redirigir a la página principal después de cerrar sesión
    });
});

// Middleware de rutas existentes
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
