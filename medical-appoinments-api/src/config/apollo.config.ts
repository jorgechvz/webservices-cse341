/* Resolvers */
import appointmentsResolver from '../controllers/resolvers/appointmentsResolver';
import doctorResolver from '../controllers/resolvers/doctorResolver';
import medicalHistoryResolver from '../controllers/resolvers/medicalHistoryResolver';
import usersResolver from '../controllers/resolvers/usersResolver';
/* TypesDefs */
import appointmentsTypesDefs from '../controllers/typesDefs/appointmentsTypesDefs';
import doctorTypesDefs from '../controllers/typesDefs/doctorTypesDefs';
import medicalHistoryTypesDefs from '../controllers/typesDefs/medicalHistoryTypesDefs';
import usersTypesDefs from '../controllers/typesDefs/usersTypesDefs';
/* Passport and Session */
import passport from 'passport';
import session from 'express-session';
/* Apollo Serve */
import { ApolloServer } from 'apollo-server-express';
/* Express */
import express, { Express, Request, Response } from 'express';
import { router } from '../routes';
import bodyParser from 'body-parser';
const app: Express = express();

const start = async (port: number) => {
  const typeDefs = [
    usersTypesDefs,
    doctorTypesDefs,
    appointmentsTypesDefs,
    medicalHistoryTypesDefs
  ];
  const resolvers = [usersResolver, doctorResolver, appointmentsResolver, medicalHistoryResolver];
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api' });
  app
    .use(bodyParser.json())
    .use(
      session({
        secret: process.env.SESSION_SECRET || '',
        resave: false,
        saveUninitialized: false
      })
    )
    .use(passport.initialize())
    .use(passport.session())
    .use('/', router)
    .use((req: Request, res: Response, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept, Z-Key'
      );
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      next();
    })
    .use((req: Request, res: Response, next) => {
      const error: Error = new Error('Not Found');
      next();
    })
    .use((err: Error, req: Request, res: Response) => {
      console.error(err.stack);
    });
  app.listen(port);
  console.log(`Connect to database and server is running in ${port} port!`);
};

export { start as startApollo };
