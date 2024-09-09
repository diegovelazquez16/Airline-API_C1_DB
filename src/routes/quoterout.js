const express = require('express');
const router = express.Router();
const quotecontroller = require('../controllers/quote');


router.get('/', quotecontroller.getAllQuotes);
router.get('/:id', quotecontroller.getQuoteById);
router.post('/add', quotecontroller.addQuote);
router.put('/update', quotecontroller.updateQuote);
router.delete('/delete',quotecontroller.deleteQuote);

module.exports = router;