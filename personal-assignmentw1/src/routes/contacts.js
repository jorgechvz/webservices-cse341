const express = require('express');

const contactsControllers = require('../controllers/contacts');

const router = express.Router();

router.get('/', contactsControllers.getData);

router.get('/:id', contactsControllers.getSingleData);

module.exports = router;
