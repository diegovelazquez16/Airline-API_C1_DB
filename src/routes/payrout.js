const express = require('express');
const router = express.Router();
const paycontroller = require('../controllers/pay');

router.get('/', paycontroller.getAllPay);
router.get('/:id', paycontroller.getPayById);
router.post('/add', paycontroller.addPay);

module.exports = router;