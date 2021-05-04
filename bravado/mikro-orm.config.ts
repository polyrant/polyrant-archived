import { MikroORM } from '@mikro-orm/core';
import path from 'path';

import { __prod__ } from './src/constants';
import { Post, User } from './src/entities';

export default {
  migrations: {
    path: path.join(__dirname, './src/migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: 'polyrant',
  type: 'postgresql',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
