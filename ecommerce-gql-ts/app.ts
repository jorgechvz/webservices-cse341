import express, { Application, Request, Response, NextFunction } from 'express';
import mongodb from './src/config/db.config';
import productsResolver from './src/controllers/producstResolvers';
import productsTypesDefs from './src/controllers/productsTypesDefs';
import userResolver from './src/controllers/userResolvers';
import userTypesDefs from './src/controllers/userTypesDefs';
import { ApolloServer } from 'apollo-server-express';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const port: number = parseInt(process.env.PORT as string, 10) || 8080;
const app: Application = express();

app.get('/', (req, res, next) => {
  res.send('Welcome to my api');
  next();
});

mongodb.initDB((err: Error | null, db?: typeof import('mongoose')) => {
  if (err) {
    console.log(err);
  }
});

async function start() {
  const typeDefs = [productsTypesDefs, userTypesDefs];
  const resolvers = [productsResolver, userResolver];
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api' });

  app.use((req, res, next) => {
    res.status(404).send('not found');
  });
  app.listen(port);
  console.log(`Connect to database and server is running in ${port} port!`);
  const client = new ApolloClient({
    uri: 'https://ecommerce-api-gql.onrender.com/api',
    cache: new InMemoryCache()
  });
  const query = gql`
    query {
      __typename
    }
  `;
  client
    .query({ query })
    .then(result => console.log(result.data))
    .catch(error => console.error(error));
}
start();
