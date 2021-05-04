import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { buildSchema } from 'type-graphql';

import { PingResolver, PostResolver } from '../src/resolvers';

const CREATE_POST = gql`
  mutation {
    createPost(content: "This is a post!") {
      content
    }
  }
`;

const DELETE_POST = gql`
  mutation {
    deletePost(id: 1)
  }
`;

const server = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver, PostResolver],
    }),
    mockEntireSchema: true,
    mocks: true,
  });

  return server;
};

describe('mutations', () => {
  test('createPost', async () => {
    const { mutate } = createTestClient(await server());

    const res = await mutate({ mutation: CREATE_POST });
    expect(res).toMatchSnapshot();
  });

  test('deletePost', async () => {
    const { mutate } = createTestClient(await server());

    const res = await mutate({ mutation: DELETE_POST });
    expect(typeof res.data.deletePost === 'boolean').toBeTruthy();
  });
});
