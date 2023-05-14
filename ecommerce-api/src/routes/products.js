const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/isAuthenticate');

const productsController = require('../controllers/products');

router.get('/', isAuthenticated,productsController.getAllProducts);
router.get('/:id', isAuthenticated,productsController.getSingleProduct);
router.post('/', isAuthenticated,productsController.createProduct);
router.put('/:id', isAuthenticated,productsController.updateProduct);
router.delete('/:id', isAuthenticated,productsController.deleteProduct);

module.exports = router;
