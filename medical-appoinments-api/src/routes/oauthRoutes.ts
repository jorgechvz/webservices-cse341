import express, { Express, Request, Response } from 'express';
import passport from 'passport';

const oauthRouter = express.Router();

oauthRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/graphql', session: false }),
  (req: Express.Request, res: Response, next) => {
    req.session.user = {provider: req.user?.provider as string,
      id: req.user?.id as string,
      displayName: req.user?.displayName as string}
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
    res.redirect('/');
  });
});

oauthRouter.get('/', (req: Request, res: Response) => {
  res.send(
    req.userData !== undefined
      ? `Welcome to my API Logged in as ${req.userData.nameUser}`
      : `Logged Out `
  );
});

export { oauthRouter };
