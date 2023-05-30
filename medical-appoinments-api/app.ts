import mongodb from './src/config/db.config';
import { Profile } from 'passport';
import './src/config/auth.config';
import { startApollo } from './src/config/apollo.config';

const port: number = parseInt(process.env.PORT as string, 10) || 8080;

declare global {
  namespace Express {
    interface User extends Profile {}
  }
}

declare module 'express-session' {
  interface Session {
    user?: any;
  }
}

mongodb.initDB((err: Error | null, db?: typeof import('mongoose')) => {
  if (err) {
    console.log(err);
  }
});

startApollo(port);
