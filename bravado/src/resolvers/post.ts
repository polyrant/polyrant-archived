import { Post } from 'src/entities';
import { MyContext, Args } from '../types';

export default {
  /************************* Queries *************************/

  Query: {
    // Get all posts
    posts: async (_: void, __: void, { em }: MyContext): Promise<Post[]> => {
      return em.find(Post, {});
    },

    // Get a post
    post: (_: void, { id }: Args, { em }: MyContext): Promise<Post | null> => {
      return em.findOne(Post, { id });
    },
  },

  /************************* Mutations *************************/

  Mutation: {
    // Create a post
    createPost: async (
      _: void,
      { content }: Args,
      { em }: MyContext
    ): Promise<Post> => {
      const post = em.create(Post, { content });
      await em.persistAndFlush(post);
      return post;
    },

    // Delete a post
    deletePost: async (
      _: void,
      { id }: Args,
      { em }: MyContext
    ): Promise<boolean> => {
      try {
        em.nativeDelete(Post, { id });
        return true;
      } catch (err) {
        return false;
      }
    },
  },

  /*************************  *************************/
};
