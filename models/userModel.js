const db = require('../config/db');

exports.createUser = (nombre_completo, correo, edad, genero, altura, nivel_actividad, password, callback) => {
    const sql = `INSERT INTO usuarios (nombre_completo, correo, edad, genero, altura, nivel_actividad, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [nombre_completo, correo, edad, genero, altura, nivel_actividad, password], callback);
};

exports.getUserById = (id, callback) => {
    const sql = `SELECT * FROM usuarios WHERE usuario_id = ?`;
    db.query(sql, [id], callback);
};
