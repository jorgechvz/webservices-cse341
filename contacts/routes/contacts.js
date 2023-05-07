const express = require('express');
const router = express.Router();

const controllerContacts = require('../controllers/contacts')

router.get('/', controllerContacts.getAllContacts)
router.get('/:id', controllerContacts.getSingleContacts)

module.exports = router;