import { IResolvers } from 'apollo-server-express';
import argon2 from 'argon2';

import { User } from '../entities';

import { MyContext, UserInput, UserResponse } from '../types';

const resolvers: IResolvers = {
  /************************* Mutations *************************/

  Mutation: {
    // Register a user
    register: async (
      _: void,
      input: UserInput,
      { em }: MyContext
    ): Promise<UserResponse> => {
      if (input.username.trim().length < 3)
        return {
          errors: [
            {
              field: 'Username',
              message: 'Username must be at least 3 characters!',
            },
          ],
        };

      if (input.password.length < 8)
        return {
          errors: [
            {
              field: 'Password',
              message: 'Password must be at least 8 characters!',
            },
          ],
        };

      const hashedPass = await argon2.hash(input.password);
      const user = em.create(User, {
        username: input.username,
        password: hashedPass,
      });

      try {
        await em.persistAndFlush(user);
      } catch (err) {
        if (err.code === '23505') {
          return {
            errors: [
              {
                field: 'Username',
                message: 'Username already exists!',
              },
            ],
          };
        }
      }

      return {
        user,
      };
    },

    // Log in a user
    login: async (
      _: void,
      input: UserInput,
      { em }: MyContext
    ): Promise<UserResponse> => {
      const user = await em.findOne(User, {
        username: input.username.toLowerCase(),
      });

      if (!user)
        return {
          errors: [
            {
              field: 'User',
              message: 'Incorrect Login Information!',
            },
          ],
        };

      const validPass = await argon2.verify(user.password, input.password);

      if (!validPass)
        return {
          errors: [
            {
              field: 'User',
              message: 'Incorrect Login Information!',
            },
          ],
        };

      return {
        user,
      };
    },
  },

  /*************************  *************************/
};

export default resolvers;
