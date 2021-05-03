import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { buildSchema } from 'type-graphql';

import { PingResolver } from '../src/resolvers/ping';

const PING = gql`
  {
    ping
  }
`;

const server = async () => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver],
    }),
    mockEntireSchema: false,
    mocks: true,
  });
};

describe('queries', () => {
  test('ping', async () => {
    const { query } = createTestClient(await server());

    const res = await query({ query: PING });
    expect(res).toMatchSnapshot();
  });
});
