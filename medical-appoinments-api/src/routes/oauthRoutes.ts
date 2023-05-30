import express, { Express, Request, Response } from 'express';
import passport from 'passport';

const oauthRouter = express.Router();

oauthRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/api', session: false }),
  (req: Request, res: Response) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

oauthRouter.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

oauthRouter.get('/logout', (req: Request, res: Response, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

oauthRouter.get('/', (req: Request, res: Response, next) => {
  res.send(
    req.session.user !== undefined
      ? `Welcome to my API Logged in as ${req.session.user.displayName}`
      : 'Logged Out'
  );
});

export default oauthRouter;
