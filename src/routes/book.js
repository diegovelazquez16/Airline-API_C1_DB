const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/book');

router.get('/:bookId/:flightId', quoteController.getQuote); 
router.get('/getAllquotes', quoteController.getAllquotes);  
router.delete('/:id', quoteController.deleteQuote); 

module.exports = router;