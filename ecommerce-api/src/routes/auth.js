//Verificacion token google
// Ruta de login, logout
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
router.get('/login', passport.authenticate('google', { scope: ['profile'] }));

module.exports = router;
