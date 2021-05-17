import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
};

export type Args = {
  id?: number;
  content?: string;
  createdAt?: string;
};
