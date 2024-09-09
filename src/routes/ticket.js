const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket');

router.get('/:bookId', ticketController.getTicket); 
router.get('/getAllTickets', ticketController.getAllTickets);  
router.get('/:passengerId', ticketController.getTicketByPassenger);
router.post('/add', ticketController.addTicket);
/*router.delete('/:ticketId', ticketController.deleteTicket); */


module.exports = router;