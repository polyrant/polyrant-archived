import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

import { Post } from '../entities';
import { MyContext } from '../types';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg('id', () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('content') content: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { content });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id') id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      em.nativeDelete(Post, { id });
      return true;
    } catch (err) {
      return false;
    }
  }
}
