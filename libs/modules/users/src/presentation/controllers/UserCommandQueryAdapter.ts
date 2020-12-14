import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserCommand } from '../../core/application/commands/CreateUserCommand'
import { DeleteUserCommand } from '../../core/application/commands/DeleteUserCommand'
import { UpdateUserCommand } from '../../core/application/commands/UpdateUserCommand'
import { UserUseCaseDto } from '../../core/application/useCases/UserUseCaseDto'
import { CreateUserRequest } from '../../core/application/useCases/createUser/CreateUserRequest'
import { DeleteUserDto } from '../../core/application/useCases/deleteUser/DeleteUserDto'
import { DeleteUserRequest } from '../../core/application/useCases/deleteUser/DeleteUserRequest'
import { UpdateUserRequest } from '../../core/application/useCases/updateUser/UpdateUserRequest'
import {
  CommandQueryBusPort,
  TypeOrmUser,
  UseCaseRequestPort,
} from '@codelab/backend'

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

  @Mutation((returns) => DeleteUserDto)
  async deleteUser(@Args('user') request: DeleteUserRequest) {
    const results = await this.commandBus.execute(
      new DeleteUserCommand(request),
    )
    const d = new DeleteUserDto()

    d.affectedRows = results.affected

    return d
  }

  @Mutation((returns) => UserUseCaseDto)
  async updateUser(@Args('user') request: UpdateUserRequest) {
    const results = await this.commandBus.execute(
      new UpdateUserCommand(request),
    )

    const d = new UserUseCaseDto()

    d.email = results.email

    return d
  }
}
