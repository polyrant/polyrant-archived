import { MikroORM } from '@mikro-orm/core';
import path from 'path';

import { __prod__ } from './src/constants';
import { Post } from './src/entities/Post';

export default {
  migrations: {
    path: path.join(__dirname, './src/migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post],
  dbName: 'polyrant',
  type: 'postgresql',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
