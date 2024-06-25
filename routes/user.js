// routes/user.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', userController.getUsers);

router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
