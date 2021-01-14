import { Injectable, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DeleteUserCommand } from '../../core/application/commands/DeleteUserCommand'
import { GetMeQuery } from '../../core/application/commands/GetMeQuery'
import { LoginUserCommand } from '../../core/application/commands/LoginUserCommand'
import { RegisterUserCommand } from '../../core/application/commands/RegisterUserCommand'
import { UpdateUserCommand } from '../../core/application/commands/UpdateUserCommand'
import { DeleteUserInput } from '../../core/application/useCases/deleteUser/DeleteUserInput'
import { GetMeRequest } from '../../core/application/useCases/getMe/GetMeRequest'
import { LoginUserInput } from '../../core/application/useCases/loginUser/LoginUserInput'
import { RegisterUserInput } from '../../core/application/useCases/registerUser/RegisterUserInput'
import { UpdateUserInput } from '../../core/application/useCases/updateUser/UpdateUserInput'
import { User } from '../../core/domain/user'
import { UserDto } from '../UserDto'
import {
  CommandQueryBusPort,
  CurrentUser,
  GqlAuthGuard,
  TypeOrmUser,
  UUID,
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

  @Mutation(() => UserDto)
  async deleteUser(@Args('input') input: DeleteUserInput) {
    const user = await this.commandBus.execute(new DeleteUserCommand(input))

    return user.toPlain()
  }

  @Mutation(() => UserDto)
  async updateUser(@Args('input') input: UpdateUserInput) {
    const user: User = await this.commandBus.execute(
      new UpdateUserCommand(input),
    )

    return user.toPlain()
  }

  @Mutation(() => UserDto)
  async registerUser(@Args('input') input: RegisterUserInput) {
    const user: User = await this.commandBus.execute(
      new RegisterUserCommand(input),
    )

    return user.toPlain()
  }

  @Mutation(() => UserDto)
  async loginUser(@Args('input') input: LoginUserInput) {
    const result = await this.commandBus.execute(new LoginUserCommand(input))

    return result.toPlain()
  }

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async getMe(@CurrentUser() user: User<UUID>) {
    const request: GetMeRequest = { user }
    const result = await this.queryBus.execute(new GetMeQuery(request))

    return result.toPlain()
  }
}
