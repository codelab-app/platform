import { GqlAuthGuard } from '@codelab/backend'
import { Injectable, Scope, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserInput, CreateUserService } from './use-cases'
import { User } from './user.model'

@Resolver(() => User)
@Injectable({ scope: Scope.REQUEST })
export class UserResolver {
  constructor(private create: CreateUserService) {}

  @Query(() => [User])
  getUsers() {
    return []
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  createUser(@Args('input') input: CreateUserInput) {
    // return this.create.execute(input)
    return {
      id: '1',
    }
  }
}
