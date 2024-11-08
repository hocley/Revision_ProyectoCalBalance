const db = require('../config/db');

// Agregar registro de consumo de alimentos
exports.addFoodConsumption = (usuario_id, alimento, porcion, calorias, callback) => {
    const query = 'INSERT INTO consumo_alimentos (usuario_id, alimento_id, fecha, hora, cantidad, calorias_consumidas) VALUES (?, ?, CURDATE(), CURTIME(), ?, ?)';
    db.query(query, [usuario_id, alimento, porcion, calorias], callback);
};

// Obtener historial de consumo por usuario
exports.getHistoryByUserId = (userId, callback) => {
    const query = 'SELECT * FROM consumo_alimentos WHERE usuario_id = ?';
    db.query(query, [userId], callback);
};

// Obtener lista de alimentos
exports.getAllFoods = (callback) => {
    const query = 'SELECT alimento_id, nombre, calorias_por_porcion FROM alimentos';
    db.query(query, callback);
};
