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
    errors: [FieldError]
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
    post(id: String!): Post
  }

  type Mutation {
    createPost(content: String!): Post!
    deletePost(id: String!): Boolean!

    register(input: UserInput!): UserResponse!
    login(input: UserInput!): UserResponse!
  }
`;
