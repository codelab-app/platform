import { GqlAuthGuard } from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserInput, CreateUserService } from './use-cases'
import { UpdateUserInput, UpdateUserService } from './use-cases/update-user'
import { User } from './user.model'

@Resolver(() => User)
@Injectable()
export class UserResolver {
  constructor(
    private create: CreateUserService,
    private update: UpdateUserService,
  ) {}

  @Query(() => [User])
  getUsers() {
    return []
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.create.execute(input)
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.update.execute(input)
  }
}
