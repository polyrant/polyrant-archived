export default {
  Query: {
    ping: async (): Promise<string> => {
      return 'Pong!';
    },
  },
};
