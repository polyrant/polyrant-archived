import { Post } from '../models';
import { Args } from '../types';

import { IResolvers } from 'apollo-server-express';

const resolvers: IResolvers = {
  /************************* Queries *************************/

  Query: {
    // Get all posts
    posts: () => {
      return Post.find();
    },

    // Get a post
    post: (_: void, { id }: Args) => {
      return Post.findOne({ id });
    },
  },

  /************************* Mutations *************************/

  Mutation: {
    // Create a post
    createPost: async (_: void, { content }: Args) => {
      const post = Post.create({ content });
      return post;
    },

    // Delete a post
    deletePost: async (_: void, { id }: Args): Promise<boolean> => {
      try {
        Post.findOneAndDelete({ id });
        return true;
      } catch (err) {
        return false;
      }
    },
  },

  /*************************  *************************/
};

export default resolvers;
