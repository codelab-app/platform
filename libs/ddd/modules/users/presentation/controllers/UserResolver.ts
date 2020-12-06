import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserCommand } from '../../core/application/commands/CreateUserCommand'
import { UserUseCaseDto } from '../../core/application/useCases/UserUseCaseDto'
import { CreateUserRequest } from '../../core/application/useCases/createUser/CreateUserRequest'
import { CommandQueryBusPort } from '@codelab/ddd/shared/core'
import { TypeOrmUser } from '@codelab/ddd/shared/infrastructure'

@Resolver(() => TypeOrmUser)
@Injectable()
export class UserResolver implements CommandQueryBusPort {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Query(() => [UserUseCaseDto])
  async getAllUsers() {
    // return this.userService.findAll()
  }

  @Mutation((returns) => UserUseCaseDto)
  async createUser(@Args('user') request: CreateUserRequest) {
    const results = await this.commandBus.execute(
      new CreateUserCommand(request),
    )

    console.log(results)

    return results
  }
}
