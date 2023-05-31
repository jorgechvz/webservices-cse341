/* Resolvers */
import passport from 'passport';
import { resolvers } from '../controllers/resolvers/index';
/* TypesDefs */
import { typeDefs } from '../controllers/typesDefs/index';
/* Passport and Session */
/* Apollo Serve */
import { ApolloServer } from 'apollo-server-express';
/* Express */
import type { Express } from 'express';

export interface MyContext {
  user: string;
  isAuthenticate: boolean;
}

export const apolloInit = async (app: Express) => {
  console.log("init apollo")
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }): MyContext => {
      const token = req.headers.authorization || '';
      console.log(token);
      const user = req.userData?.nameUser as string;
      const isAuthenticate = req.userData?.isAuthenticated as boolean;
      return { user, isAuthenticate };
    }
  });
  try {
    await apolloServer.start();
    apolloServer.applyMiddleware({
      app,
      path: '/graphql'
    });
    console.log("apollo ready")
  } catch (err) {
    console.log(err);
  }
};
