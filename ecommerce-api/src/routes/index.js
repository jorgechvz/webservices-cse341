const express = require('express');
const passport = require('passport');
const productRouter = require('./products');
const { required } = require('joi');
const router = express.Router();
const authRouter = require('./auth');
router.use('/', require('./swagger'));
router.use('/products', productRouter);
router.use('/users', require('./users'));
router.use('/', authRouter);
router.use('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
module.exports = router;
