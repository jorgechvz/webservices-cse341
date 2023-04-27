const express = require('express');
const router = express.Router();

const contactsControllers = require('../controllers/contacts');

router.get('/', contactsControllers.getData);

router.get('/:id', contactsControllers.getSingleData);

router.post('/', contactsControllers.createData);

router.put('/:id', contactsControllers.updateData);

router.delete('/:id', contactsControllers.deleteData);

module.exports = router;
