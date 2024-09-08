const express = require('express');
const router = express.Router();
const passengersController = require('../controllers/passengers');

router.get('/', passengersController.getAllPassengers);
router.get('/:id', passengersController.getPassengerById);
router.post('/add', passengersController.addPassenger);
router.put('/:id', passengersController.updatePassenger);
router.delete('/:id', passengersController.deletePassenger);

module.exports = router;
