// import argon2 from 'argon2';
// import {
//   Arg,
//   Ctx,
//   Field,
//   InputType,
//   Mutation,
//   ObjectType,
//   Resolver,
// } from 'type-graphql';

// import { User } from '../entities';
// import { MyContext } from '../types';

// @InputType()
// class UserInput {
//   @Field()
//   username!: string;

//   @Field()
//   password!: string;
// }

// @ObjectType()
// class FieldError {
//   @Field()
//   field: string;

//   @Field()
//   message: string;
// }

// @ObjectType()
// class UserResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => User, { nullable: true })
//   user?: User;
// }

// @Resolver()
// export class UserResolver {
//   @Mutation(() => UserResponse)
//   async register(
//     @Arg('input') input: UserInput,
//     @Ctx() { em }: MyContext
//   ): Promise<UserResponse> {
//     if (input.username.trim().length < 3)
//       return {
//         errors: [
//           {
//             field: 'Username',
//             message: 'Username must be at least 3 characters!',
//           },
//         ],
//       };

//     if (input.password.length < 8)
//       return {
//         errors: [
//           {
//             field: 'Password',
//             message: 'Password must be at least 8 characters!',
//           },
//         ],
//       };

//     const hashedPass = await argon2.hash(input.password);
//     const user = em.create(User, {
//       username: input.username,
//       password: hashedPass,
//     });

//     try {
//       await em.persistAndFlush(user);
//     } catch (err) {
//       if (err.code === '23505') {
//         return {
//           errors: [
//             {
//               field: 'Username',
//               message: 'Username already exists!',
//             },
//           ],
//         };
//       }
//     }

//     return {
//       user,
//     };
//   }

//   @Mutation(() => UserResponse)
//   async login(
//     @Arg('input') input: UserInput,
//     @Ctx() { em }: MyContext
//   ): Promise<UserResponse> {
//     const user = await em.findOne(User, {
//       username: input.username.toLowerCase(),
//     });

//     if (!user)
//       return {
//         errors: [
//           {
//             field: 'User',
//             message: 'Incorrect Login Information!',
//           },
//         ],
//       };

//     const validPass = await argon2.verify(user.password, input.password);

//     if (!validPass)
//       return {
//         errors: [
//           {
//             field: 'User',
//             message: 'Incorrect Login Information!',
//           },
//         ],
//       };

//     return {
//       user,
//     };
//   }
// }
