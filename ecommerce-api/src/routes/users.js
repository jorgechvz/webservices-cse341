const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/isAuthenticate');

const userController = require('../controllers/users');

router.get('/',  userController.getAllUsers);
router.get('/:id',  userController.getSingleUser);
router.post('/', isAuthenticated, userController.createUser);
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;
