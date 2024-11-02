const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');

app.use(express.json()); // Middleware para parsear JSON

// Rutas de usuario
app.use('/api/users', userRoutes);

// Rutas de alimentos y consumo
app.use('/api/foods', foodRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
