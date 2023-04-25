const express = require('express');

const contactsControllers = require('../controllers/contacts');

const router = express.Router();

router.get('/contacts', contactsControllers.getData);

router.get('/contacts/:id', contactsControllers.getSingleData);

module.exports = router;
