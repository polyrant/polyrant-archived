import { IResolvers } from 'apollo-server-express';

const resolvers: IResolvers = {
  Query: {
    ping: async (): Promise<string> => {
      return 'Pong!';
    },
  },
};

export default resolvers;
