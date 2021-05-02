import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import * as Mongoose from 'mongoose';
import { buildSchema } from 'type-graphql';

(async function () {
  require('dotenv').config();

  const { MONGO_URI, SERVER_URI, PORT } = process.env;

  const schema = await buildSchema({
    resolvers: [''],
    emitSchemaFile: true,
  });

  const app = Express();

  Mongoose.connect(MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('[Database]: Connected!');

      const server = new ApolloServer({
        schema,
        context: () => ({}),
      });

      server.applyMiddleware({ app });

      app.listen(PORT, () => {
        console.log(`[Server]: Running at ${SERVER_URI}:${PORT}`);
      });
    })
    .catch((err) => console.error(err));
})();
