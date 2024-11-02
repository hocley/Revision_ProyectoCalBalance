const userModel = require('../models/userModel');

exports.registerUser = (req, res) => {
    const { nombre_completo, correo, edad, genero, altura, nivel_actividad, password } = req.body;

    userModel.createUser(nombre_completo, correo, edad, genero, altura, nivel_actividad, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
    });
};

exports.getUserById = (req, res) => {
    const userId = req.params.id;

    userModel.getUserById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuario' });
        }
        res.status(200).json(user);
    });
};
