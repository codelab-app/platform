import { Inject, Injectable, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetMeQuery } from '../../core/application/commands/GetMeQuery'
import { DeleteUserInput } from '../../core/application/useCases/deleteUser/DeleteUserInput'
import { DeleteUserService } from '../../core/application/useCases/deleteUser/DeleteUserService'
import { GetMeRequest } from '../../core/application/useCases/getMe/GetMeRequest'
import { LoginUserInput } from '../../core/application/useCases/loginUser/LoginUserInput'
import { LoginUserService } from '../../core/application/useCases/loginUser/LoginUserService'
import { RegisterUserInput } from '../../core/application/useCases/registerUser/RegisterUserInput'
import { RegisterUserService } from '../../core/application/useCases/registerUser/RegisterUserService'
import { UpdateUserInput } from '../../core/application/useCases/updateUser/UpdateUserInput'
import { UpdateUserService } from '../../core/application/useCases/updateUser/UpdateUserService'
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
    @Inject(UserDITokens.DeleteUserUseCase)
    readonly deleteUserService: DeleteUserService,
    @Inject(UserDITokens.UpdateUserUseCase)
    readonly updateUserService: UpdateUserService,
  ) {}

  @Mutation(() => UserDto)
  async deleteUser(@Args('input') input: DeleteUserInput) {
    return this.deleteUserService.execute(input)
  }

  @Mutation(() => UserDto)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return this.updateUserService.execute(input)
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
