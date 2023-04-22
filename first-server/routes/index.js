const express =require('express');
const controllerServer = require('../controllers/controllerServer')

const router = express.Router();

router.get('/', controllerServer.getData);

module.exports = router;