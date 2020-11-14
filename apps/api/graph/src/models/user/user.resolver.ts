import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserInput } from './UserInput'
import { UserDto } from './dto/UserDto'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(public userService: UserService) {}

  @Query(() => [UserEntity])
  async getAllUsers() {
    return this.userService.findAll()
  }

  @Mutation((returns) => UserDto)
  async registerUser(@Args('user') user: UserInput) {
    return this.userService.createUser(user)
  }

  @Query((returns) => UserDto)
  async login(@Args('user') user: UserInput) {
    return this.userService.login(user)
  }
}
