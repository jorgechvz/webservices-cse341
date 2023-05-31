/* Resolvers */
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import cookieParser from 'cookie-parser';
import { resolvers } from '../controllers/resolvers/index';
/* TypesDefs */
import { typeDefs } from '../controllers/typesDefs/index';
/* Passport and Session */
/* Apollo Serve */
import { ApolloServer } from 'apollo-server-express';
/* Express */
import type { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();


export interface MyContext {
  user: string;
  isAuthenticate: boolean;
}

export const apolloInit = async (app: Express) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const token = req.cookies.token;
      console.log(token);
      let user;
      let isAuthenticated = false;
      try {
        if (token) {
          const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
          user = decoded;
          isAuthenticated = true;
          return { user, isAuthenticated };
        }
      } catch (err) {
        throw new AuthenticationError('User not authenticate');
      }
    }
  });
  try {
    await apolloServer.start();
    apolloServer.applyMiddleware({
      app,
      path: '/graphql',
      cors: {
        origin: ['https://medical-appointments-api.onrender.com', 'https://studio.apollographql.com'],
        credentials: true
      }
    });
  } catch (err) {
    console.log(err);
  }
};
