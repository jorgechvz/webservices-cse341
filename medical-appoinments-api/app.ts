import express, { Application, Request, Response, NextFunction } from 'express';
import mongodb from './src/config/db.config';
/* Resolvers */
import usersResolver from './src/controllers/resolvers/usersResolver';
import medicalHistoryResolver from './src/controllers/resolvers/medicalHistoryResolver';
import appointmentsResolver from './src/controllers/resolvers/appointmentsResolver';
import doctorResolver from './src/controllers/resolvers/doctorResolver';
/* TypesDefs */
import doctorTypesDefs from './src/controllers/typesDefs/doctorTypesDefs';
import usersTypesDefs from './src/controllers/typesDefs/usersTypesDefs';
import medicalHistoryTypesDefs from './src/controllers/typesDefs/medicalHistoryTypesDefs';
import appointmentsTypesDefs from './src/controllers/typesDefs/appointmentsTypesDefs';
/* Apollo Server */
import { ApolloServer} from 'apollo-server-express';


const port: number = parseInt(process.env.PORT as string, 10) || 8080;
const app: Application = express();

app
  .get("/", (req, res, next) => {
    res.send("Welcome to my api");
    next();
  });

mongodb.initDB((err: Error | null, db?: typeof import('mongoose')) => {
  if (err) {
    console.log(err);
  } 
});


async function start() {
    const typeDefs = [usersTypesDefs, doctorTypesDefs, appointmentsTypesDefs, medicalHistoryTypesDefs];
    const resolvers = [usersResolver, doctorResolver, appointmentsResolver, medicalHistoryResolver];
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/api" });
  
    app.use((req, res, next) => {
      res.status(404).send("not found");
    });
    app.listen(port);
    console.log(`Connect to database and server is running in ${port} port!`);
}
start();