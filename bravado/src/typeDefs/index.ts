import { gql } from 'apollo-server-express';

export default gql`
  input UserInput {
    username: String!
    password: String!
  }

  type FieldError {
    field: String
    message: String
  }

  type UserResponse {
    errors: [FieldError]!
    user: User
  }

  type User {
    id: Int!
    createdAt: String!
    updatedAt: String!
    username: String!
    password: String!
    name: String
    bio: String
  }

  type Post {
    id: String!
    content: String!
    createdAt: String!
  }

  type Query {
    ping: String!

    posts: [Post]!
    post: Post
  }

  type Mutation {
    createPost: Post!
    deletePost: Boolean!

    register: UserResponse!
    login: UserResponse!
  }
`;
