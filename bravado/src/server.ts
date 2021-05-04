import 'reflect-metadata';
require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { buildSchema } from 'type-graphql';

import ormConfig from '../mikro-orm.config';
import { PingResolver, PostResolver, UserResolver } from './resolvers';

const main = async () => {
  const { SERVER_URI, PORT } = process.env;

  const orm = await MikroORM.init(ormConfig);
  orm.getMigrator().up();

  const app = express();

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apollo.applyMiddleware({ app });

  app.listen(2003, () => {
    console.log(`[Server]: Started on ${SERVER_URI}:${PORT}/graphql`);
  });
};

main().catch((err) => console.error(err));
