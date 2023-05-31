import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { sign } from 'jsonwebtoken';

dotenv.config();

const oauthRouter = express.Router();

oauthRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/graphql', session: false }),
  (req: Express.Request, res: Response, next) => {
    const token = sign({ provider: req.user?.provider, id: req.user?.id, displayName: req.user?.displayName }, process.env.TOKEN_SECRET as string);
    res.cookie('token', token, { sameSite: 'none', secure: true });
    req.session.user = {
      provider: req.user?.provider as string,
      id: req.user?.id as string,
      displayName: req.user?.displayName as string
    };
    next();
    res.redirect('/');
  }
);

oauthRouter.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

oauthRouter.get('/logout', (req: Request, res: Response, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('token');
    res.redirect('/');
  });
});

oauthRouter.get('/', (req: Request, res: Response) => {
  res.send(
    req.session.user !== undefined
      ? `Welcome to my API Logged in as ${req.session.user.displayName}`
      : `Logged Out `
  );
});

export { oauthRouter };
