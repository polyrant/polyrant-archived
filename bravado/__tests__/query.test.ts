import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';

import resolvers from '../src/resolvers';
import typeDefs from '../src/typeDefs';

const PING = gql`
  {
    ping
  }
`;

const POSTS = gql`
  {
    posts {
      content
    }
  }
`;

const POST = gql`
  {
    post(id: 1) {
      content
    }
  }
`;

const server = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    mockEntireSchema: true,
    mocks: true,
  });

  return server;
};

describe('queries', () => {
  test('ping', async () => {
    const { query } = createTestClient(await server());

    const res = await query({ query: PING });
    expect(res).toMatchSnapshot();
  });

  test('posts', async () => {
    const { query } = createTestClient(await server());

    const res = await query({ query: POSTS });
    expect(res).toMatchSnapshot();
  });

  test('post', async () => {
    const { query } = createTestClient(await server());

    const res = await query({ query: POST });
    expect(res).toMatchSnapshot();
  });
});
