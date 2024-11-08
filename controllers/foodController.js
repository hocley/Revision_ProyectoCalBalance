const foodModel = require('../models/foodModel');

// Registro de consumo de alimentos
exports.registerFoodConsumption = (req, res) => {
    const { usuario_id, alimento, porcion, calorias } = req.body;

    foodModel.addFoodConsumption(usuario_id, alimento, porcion, calorias, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar alimento' });
        }
        res.status(201).json({ message: 'Consumo de alimento registrado exitosamente' });
    });
};

// Obtener historial de consumo de alimentos
exports.getConsumptionHistory = (req, res) => {
    const userId = req.params.userId;

    foodModel.getHistoryByUserId(userId, (err, history) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener historial de consumo' });
        }
        res.status(200).json(history);
    });
};

// Obtener lista de alimentos
exports.getFoodList = (req, res) => {
    foodModel.getAllFoods((err, foods) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener la lista de alimentos' });
        }
        res.status(200).json(foods);
    });
};

exports.getConsumptionHistory = (req, res) => {
    const userId = req.params.userId;

    // Verificar que el usuario autenticado está accediendo a su propio historial
    if (req.session.user.id !== parseInt(userId, 10)) {
        return res.status(403).json({ error: 'Acceso denegado' });
    }

    foodModel.getHistoryByUserId(userId, (err, history) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener historial de consumo' });
        }
        res.status(200).json(history);
    });
};
