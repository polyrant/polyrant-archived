import 'reflect-metadata';
require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { MikroORM } from '@mikro-orm/core';

import ormConfig from '../mikro-orm.config';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const main = async () => {
  const { SERVER_URI, PORT } = process.env;

  const orm = await MikroORM.init(ormConfig);
  orm.getMigrator().up();

  const app = express();

  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => ({ em: orm.em }),
  });

  apollo.applyMiddleware({ app });

  app.listen(2003, () => {
    console.log(`[Server]: Started on ${SERVER_URI}:${PORT}/graphql`);
  });
};

main().catch((err) => console.error(err));
