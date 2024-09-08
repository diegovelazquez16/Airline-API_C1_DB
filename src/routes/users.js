const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, usersController.getAllUsers);
router.get('/:id', authenticateToken, usersController.getUserById);
router.post('/add', usersController.addUser); // No protegemos la creación de usuarios
router.put('/:id', authenticateToken, usersController.updateUser);
router.delete('/:id', authenticateToken, usersController.deleteUser);

module.exports = router;
