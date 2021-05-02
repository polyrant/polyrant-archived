import { MikroORM } from '@mikro-orm/core';

import ormConfig from '../mikro-orm.config';

(async function () {
  const orm = await MikroORM.init(ormConfig);

  orm.getMigrator().up();
})();
