import { Query, Resolver } from '@nestjs/graphql'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(public userService: UserService) {}

  @Query(() => [UserEntity])
  async getAllUsers() {
    return this.userService.findAll()
  }
}
