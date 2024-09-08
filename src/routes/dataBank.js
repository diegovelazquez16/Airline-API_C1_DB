const express = require('express');
const router = express.Router();
const dataBankController = require('../controllers/dataBank');

router.get('/', dataBankController.getAllDataBanks);
router.get('/:id', dataBankController.getDataBankById);
router.post('/add', dataBankController.addDataBank);
router.put('/:id', dataBankController.updateDataBank);
router.delete('/:id', dataBankController.deleteDataBank);

module.exports = router;
