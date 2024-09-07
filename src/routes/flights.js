const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flights');

router.get('/', flightsController.getAllFlights); 
router.get('/:id', flightsController.getFlightById); 
router.post('/add', flightsController.addFlight); 
router.put('/:id', flightsController.updateFlight); 
router.delete('/:id', flightsController.deleteFlight); 

module.exports = router;
