const db = require('../config/db');

exports.addFoodConsumption = (usuario_id, alimento, porcion, calorias, callback) => {
    const sql = `INSERT INTO consumo_alimentos (usuario_id, alimento, porcion, calorias_consumidas) VALUES (?, ?, ?, ?)`;
    db.query(sql, [usuario_id, alimento, porcion, calorias], callback);
};

exports.getHistoryByUserId = (userId, callback) => {
    const sql = `SELECT * FROM consumo_alimentos WHERE usuario_id = ? ORDER BY fecha DESC`;
    db.query(sql, [userId], callback);
};
