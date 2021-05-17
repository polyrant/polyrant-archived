import pingResolvers from './ping';

export default {
  Query: {
    ...pingResolvers.Query,
  },
};
