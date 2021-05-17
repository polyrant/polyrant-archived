import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { User } from './entities';

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
};

export type Args = {
  id?: number;
  content?: string;
  createdAt?: string;
};

export type UserInput = {
  username: string;
  password: string;
};

export type UserResponse = {
  errors?: [
    {
      field?: string;
      message?: string;
    }
  ];
  user?: User;
};
