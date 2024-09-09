const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket');

router.get('/:bookId', ticketController.getTicket); 
router.get('/getAllTickets', ticketController.getAllTickets);  
router.get('/:passengerId', ticketController.getTicketByPassenger);

module.exports = router;
