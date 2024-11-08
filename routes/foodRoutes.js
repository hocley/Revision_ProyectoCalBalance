const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.post('/register', foodController.registerFoodConsumption);
router.get('/history/:userId', foodController.getConsumptionHistory);
router.get('/alimentos', foodController.getFoodList); // Nueva ruta para obtener la lista de alimentos

module.exports = router;
