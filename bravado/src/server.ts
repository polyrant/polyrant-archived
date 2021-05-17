import 'reflect-metadata';
require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { MikroORM } from '@mikro-orm/core';

import ormConfig from '../mikro-orm.config';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const main = async () => {
  const { SERVER_URI, PORT } = process.env;

  const orm = await MikroORM.init(ormConfig);
  orm.getMigrator().up();

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
    context: () => ({ em: orm.em }),
    validationRules: [depthLimit(7)],
  });

  apollo.applyMiddleware({ app });

  app.listen(2003, () => {
    console.log(`[Server]: Started on ${SERVER_URI}:${PORT}/graphql`);
  });
};

main().catch((err) => console.error(err));
