import 'reflect-metadata';
require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import mongoose from 'mongoose';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const main = async () => {
  const { SERVER_URI, MONGO_URI, PORT } = process.env;

  const app = express();

  app.use(
    cors({
      origin: '*', // TODO: Update for prod
    })
  );
  app.use(compression());

  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => ({}),
    validationRules: [depthLimit(7)],
  });

  apollo.applyMiddleware({ app });

  app.listen(2003, async () => {
    console.log(`[Server]: Started on ${SERVER_URI}:${PORT}/graphql`);
    await mongoose
      .connect(MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('[Database]: Up and running!'))
      .catch((err) => console.error(err));
  });
};

main().catch((err) => console.error(err));
