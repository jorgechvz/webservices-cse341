const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/login', passport.authenticate('google'), (req, res) => {})
router.use('logout', (req, res, next) => {
    
})
module.exports = router;
