import { Inject, Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DeleteUserInput } from '../../core/application/useCases/deleteUser/DeleteUserInput'
import { DeleteUserService } from '../../core/application/useCases/deleteUser/DeleteUserService'
import { LoginUserInput } from '../../core/application/useCases/loginUser/LoginUserInput'
import { LoginUserService } from '../../core/application/useCases/loginUser/LoginUserService'
import { RegisterUserInput } from '../../core/application/useCases/registerUser/RegisterUserInput'
import { RegisterUserService } from '../../core/application/useCases/registerUser/RegisterUserService'
import { UpdateUserInput } from '../../core/application/useCases/updateUser/UpdateUserInput'
import { UpdateUserService } from '../../core/application/useCases/updateUser/UpdateUserService'
import { UserDITokens } from '../../framework/UserDITokens'
import { User } from '../User'
import { CurrentUser, GqlAuthGuard } from '@codelab/backend'

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
export class UserGraphqlAdapter {
  constructor(
    @Inject(UserDITokens.LoginUserUseCase)
    readonly loginUserService: LoginUserService,
    @Inject(UserDITokens.RegisterUserUseCase)
    readonly registerUserService: RegisterUserService,
    @Inject(UserDITokens.DeleteUserUseCase)
    readonly deleteUserService: DeleteUserService,
    @Inject(UserDITokens.UpdateUserUseCase)
    readonly updateUserService: UpdateUserService,
  ) {}

  @Mutation(() => User)
  async deleteUser(@Args('input') input: DeleteUserInput) {
    return await this.deleteUserService.execute(input)
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return await this.updateUserService.execute(input)
  }

  @Mutation(() => User)
  async registerUser(@Args('input') input: RegisterUserInput) {
    return await this.registerUserService.execute(input)
  }

  @Mutation(() => User)
  async loginUser(@Args('input') input: LoginUserInput) {
    return await this.loginUserService.execute(input)
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getMe(@CurrentUser() user: User) {
    return user
  }

  // @ResolveField(() => [App])
  // apps(@Parent() user: User) {
  //   console.log(user)

  //   return []
  // }
}
