import { Inject, Injectable, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DeleteUserCommand } from '../../core/application/commands/DeleteUserCommand'
import { GetMeQuery } from '../../core/application/commands/GetMeQuery'
import { UpdateUserCommand } from '../../core/application/commands/UpdateUserCommand'
import { DeleteUserInput } from '../../core/application/useCases/deleteUser/DeleteUserInput'
import { GetMeRequest } from '../../core/application/useCases/getMe/GetMeRequest'
import { LoginUserInput } from '../../core/application/useCases/loginUser/LoginUserInput'
import { LoginUserService } from '../../core/application/useCases/loginUser/LoginUserService'
import { RegisterUserInput } from '../../core/application/useCases/registerUser/RegisterUserInput'
import { RegisterUserService } from '../../core/application/useCases/registerUser/RegisterUserService'
import { UpdateUserInput } from '../../core/application/useCases/updateUser/UpdateUserInput'
import { User } from '../../core/domain/user'
import { UserEntity } from '../../core/domain/user.codec'
import { UserDITokens } from '../../framework/UserDITokens'
import { UserDto } from '../UserDto'
import {
  CommandQueryBusPort,
  CurrentUser,
  GqlAuthGuard,
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
@Resolver(() => User)
@Injectable()
export class UserCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
    @Inject(UserDITokens.LoginUserUseCase)
    readonly loginUserService: LoginUserService,
    @Inject(UserDITokens.RegisterUserUseCase)
    readonly registerUserService: RegisterUserService,
  ) {}

  @Mutation(() => UserDto)
  async deleteUser(@Args('input') input: DeleteUserInput) {
    const user = await this.commandBus.execute(new DeleteUserCommand(input))

    return UserEntity.encode(user)
  }

  @Mutation(() => UserDto)
  async updateUser(@Args('input') input: UpdateUserInput) {
    const user: User = await this.commandBus.execute(
      new UpdateUserCommand(input),
    )

    return UserEntity.encode(user)
  }

  @Mutation(() => UserDto)
  async registerUser(@Args('input') input: RegisterUserInput) {
    return this.registerUserService.execute(input)
  }

  @Mutation(() => UserDto)
  async loginUser(@Args('input') input: LoginUserInput) {
    return this.loginUserService.execute(input)
  }

  @Query(() => UserDto)
  @UseGuards(GqlAuthGuard)
  async getMe(@CurrentUser() user: User) {
    const request: GetMeRequest = { user }
    const result = await this.queryBus.execute(new GetMeQuery(request))

    return UserEntity.encode(result)
  }
}
