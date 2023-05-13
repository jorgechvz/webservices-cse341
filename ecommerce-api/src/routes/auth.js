//Verificacion token google
// Ruta de login, logout
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api-docs', session: false}), 
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
    });
router.get('/login', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });

router.get('/', (req, res) => {
    res.send(
      req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out'
    );
  });
module.exports = router;
