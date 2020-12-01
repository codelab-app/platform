import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UserEntity } from '../database/typeorm/UserEntity'
import { User } from '../dto/User'
import { UserInput } from '../dto/UserInput'

@Resolver(() => UserEntity)
export class UserResolver {
  @Mutation((returns) => User)
  async createUser(@Args('user') user: UserInput) {
    return null
  }
}
