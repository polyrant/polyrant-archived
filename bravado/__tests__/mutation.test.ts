import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';

import resolvers from '../src/resolvers';
import typeDefs from '../src/typeDefs';

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

const REGISTER = gql`
  mutation {
    register(input: { username: "test", password: "12345678" }) {
      errors {
        field
        message
      }

      user {
        username
        bio
        name
        updatedAt
        createdAt
      }
    }
  }
`;

const LOGIN = gql`
  mutation {
    login(input: { username: "test", password: "12345678" }) {
      user {
        username
        bio
        name
        createdAt
        updatedAt
      }
      errors {
        message
      }
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

  test('register', async () => {
    const { mutate } = createTestClient(await server());

    const res = await mutate({ mutation: REGISTER });
    expect(res).toMatchSnapshot();
  });

  test('login', async () => {
    const { mutate } = createTestClient(await server());

    const res = await mutate({ mutation: LOGIN });
    expect(res).toMatchSnapshot();
  });
});
