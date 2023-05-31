import { Profile } from 'passport';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { router } from './src/routes/index';
import { passportMiddleware } from './src/config/auth.config';
import { initDB } from './src/config/db.config';
import { apolloInit } from './src/config/apollo.config';

const app: Express = express();
const port: number = parseInt(process.env.PORT as string, 10) || 8080;

void apolloInit(app);

app
  .use(bodyParser.json())
  .use(
    session({
      secret: process.env.SESSION_SECRET || '',
      resave: false,
      saveUninitialized: false
    })
  )
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Request-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(passport.initialize())
  .use(passport.session())
  .use('/main', (req, res) => {
    res.send('Welcome');
  })
  .use(
    '/',
    (req, res, next) => {
      req.userData = {id: req.session.user?.id, nameUser: req.session.user?.displayName , isAuthenticated: !!req.session.user}; 
      next();
    },
    router
  );

interface UserSession {
  id?: string,
  nameUser?: string,
  isAuthenticated: boolean
}
declare global {
  namespace Express {
    interface User extends Profile {}
    export interface Request {
      userData?: UserSession;
    }
  }
}

passportMiddleware();
declare module 'express-session' {
  interface Session {
    user?: Profile;
  }
}

initDB((err: Error | null, db?: typeof import('mongoose')) => {
  if (err) {
    console.log(err);
  }
});

app.listen(port);
console.log(`Connect to database and server is running in ${port} port!`);
