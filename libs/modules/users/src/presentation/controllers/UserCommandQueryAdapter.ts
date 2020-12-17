import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserCommand } from '../../core/application/commands/CreateUserCommand'
import { DeleteUserCommand } from '../../core/application/commands/DeleteUserCommand'
import { UpdateUserCommand } from '../../core/application/commands/UpdateUserCommand'
import { GetUsersQuery } from '../../core/application/queries/GetUsersQuery'
import { UserUseCaseDto } from '../../core/application/useCases/UserUseCaseDto'
import { CreateUserRequest } from '../../core/application/useCases/createUser/CreateUserRequest'
import { DeleteUserRequest } from '../../core/application/useCases/deleteUser/DeleteUserRequest'
import { UpdateUserRequest } from '../../core/application/useCases/updateUser/UpdateUserRequest'
import { User } from '../../core/domain/user'
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
    readonly queryBus: QueryBus<GetUsersQuery>,
  ) {}

  @Query(() => [UserUseCaseDto])
  async users() {
    const users = await this.queryBus.execute(new GetUsersQuery())

    return User.arrayToPlain(users)
  }

  @Mutation((returns) => UserUseCaseDto)
  async createUser(@Args('user') request: CreateUserRequest) {
    const user: User = await this.commandBus.execute(
      new CreateUserCommand(request),
    )

    return user.toPlain()
  }

  @Mutation((returns) => UserUseCaseDto)
  async deleteUser(@Args('user') request: DeleteUserRequest) {
    const user = await this.commandBus.execute(new DeleteUserCommand(request))

    return user.toPlain()
  }

  @Mutation((returns) => UserUseCaseDto)
  async updateUser(@Args('user') request: UpdateUserRequest) {
    const user: User = await this.commandBus.execute(
      new UpdateUserCommand(request),
    )

    return user.toPlain()
  }
}
