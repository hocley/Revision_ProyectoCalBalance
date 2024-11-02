const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.post('/register', foodController.registerFoodConsumption);
router.get('/history/:userId', foodController.getConsumptionHistory);

module.exports = router;
