import { GqlAuthGuard } from '@codelab/backend'
import { Injectable, Scope, UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { User } from '../domain'
import { CreateUserInput } from '../domain/dto/CreateUserInput'
import { CreateUserService } from '../domain/use-cases/create-user.service'

@Resolver(() => User)
@Injectable({ scope: Scope.REQUEST })
export class UserResolver {
  constructor(private create: CreateUserService) {}

  @Query(() => User)
  @UseGuards(new GqlAuthGuard())
  createUser(@Args('input') input: CreateUserInput) {
    return this.create.execute(input)
  }
}
