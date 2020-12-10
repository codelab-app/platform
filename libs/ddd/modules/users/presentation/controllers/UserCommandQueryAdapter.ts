import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserCommand } from '../../core/application/commands/CreateUserCommand'
import { UserUseCaseDto } from '../../core/application/useCases/UserUseCaseDto'
import { CreateUserRequest } from '../../core/application/useCases/createUser/CreateUserRequest'
import {
  CommandQueryBusPort,
  UseCaseRequestPort,
} from '@codelab/ddd/backend/core'
import { TypeOrmUser } from '@codelab/ddd/backend/infrastructure'

/**
 * An adapter for GraphQL User resolvers.
 *
 * @remarks
 * Converts a GraphQL resolver to a use case command or query
 *
 * @inheritDoc CommandQueryBusPort
 */
@Resolver(() => TypeOrmUser)
@Injectable()
export class UserCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  @Query(() => [UserUseCaseDto])
  async getAllUsers() {
    // return this.userService.findAll()
  }

  @Mutation((returns) => UserUseCaseDto)
  async createUser(@Args('user') request: CreateUserRequest) {
    const results = await this.commandBus.execute(
      new CreateUserCommand(request),
    )

    return results
  }
}
