const db = require('../config/db'); // Asegúrate de que el archivo `db.js` esté configurado para la conexión

// Agregar consumo de alimento
exports.addFoodConsumption = (usuario_id, alimento_id, porcion, calorias, callback) => {
    const query = `INSERT INTO consumo_alimentos (usuario_id, alimento_id, cantidad, calorias_consumidas, fecha, hora)
                   VALUES (?, ?, ?, ?, NOW(), NOW())`;
    db.query(query, [usuario_id, alimento_id, porcion, calorias], callback);
};

// Obtener historial de consumo por usuario
exports.getHistoryByUserId = (userId, callback) => {
    const query = `SELECT ca.fecha, ca.hora, a.nombre AS alimento, ca.cantidad, ca.calorias_consumidas
FROM consumo_alimentos ca
JOIN alimentos a ON ca.alimento_id = a.alimento_id
WHERE ca.usuario_id = ?
ORDER BY ca.fecha DESC, ca.hora DESC;`;
    db.query(query, [userId], callback);
};

// Obtener lista de alimentos
exports.getAllFoods = (callback) => {
    const query = `SELECT alimento_id, nombre, calorias_por_porcion FROM alimentos ORDER BY nombre`;
    db.query(query, callback);
};
