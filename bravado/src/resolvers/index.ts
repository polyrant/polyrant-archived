import pingResolvers from './ping';
import postResolvers from './post';
import userResolvers from './user';

export default {
  Query: {
    ...pingResolvers.Query,
    ...postResolvers.Query,
  },

  Mutation: {
    ...postResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
