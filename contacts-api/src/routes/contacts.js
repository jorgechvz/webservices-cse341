const express = require('express');

const contactsControllers = require('../controllers/contacts');

const router = express.Router();

router.get('/contacts', contactsControllers.getData);

router.get('/contacts/:id', contactsControllers.getSingleData);

router.post('/contacts', contactsControllers.createData);

router.put('/contacts/:id', contactsControllers.updateData);

router.delete('/contacts/:id', contactsControllers.deleteData);

module.exports = router;
