const express = require('express');
const router = express.Router();
const airplanesController = require('../controllers/airplanes');

router.get('/', airplanesController.getAllAirplanes); 
router.get('/:id', airplanesController.getAirplaneById); 
router.post('/add', airplanesController.addAirplane); 
router.put('/:id', airplanesController.updateAirplane); 
router.delete('/:id', airplanesController.deleteAirplane); 

module.exports = router;
