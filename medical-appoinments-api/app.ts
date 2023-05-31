import { Profile } from 'passport';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { router } from './src/routes/index';
import { passportMiddleware } from './src/config/auth.config';
import { initDB } from './src/config/db.config';
import { apolloInit } from './src/config/apollo.config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: Express = express();
const port: number = parseInt(process.env.PORT as string, 10) || 8080;

interface UserSession {
  id?: string;
  nameUser?: string;
  isAuthenticated: boolean;
}
declare global {
  namespace Express {
    interface User extends Profile {}
    export interface Request {
      userData?: UserSession;
    }
  }
}

declare module 'express-session' {
  interface Session {
    user?: Profile;
  }
}

void apolloInit(app);

app
  .use(bodyParser.json())
  .use(cookieParser())
  .use(
    session({
      secret: process.env.SESSION_SECRET || '',
      resave: false,
      saveUninitialized: false
    })
  )
  .use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Request-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', 'https://medical-appointments-api.onrender.com');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
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
      req.userData = {
        id: req.session.user?.id,
        nameUser: req.session.user?.displayName,
        isAuthenticated: !!req.session.user
      };
      next();
    },
    router
  );

passportMiddleware();

initDB((err: Error | null, db?: typeof import('mongoose')) => {
  if (err) {
    console.log(err);
  }
});

app.listen(port);
console.log(`Connect to database and server is running in ${port} port!`);
