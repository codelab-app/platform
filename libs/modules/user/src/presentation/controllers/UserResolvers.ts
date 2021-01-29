import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DeleteUserInput } from '../../core/application/useCases/deleteUser/DeleteUserInput'
import { DeleteUserService } from '../../core/application/useCases/deleteUser/DeleteUserService'
import { LoginUserInput } from '../../core/application/useCases/loginUser/LoginUserInput'
import { LoginUserService } from '../../core/application/useCases/loginUser/LoginUserService'
import { RegisterUserInput } from '../../core/application/useCases/registerUser/RegisterUserInput'
import { RegisterUserService } from '../../core/application/useCases/registerUser/RegisterUserService'
import { UpdateUserInput } from '../../core/application/useCases/updateUser/UpdateUserInput'
import { UpdateUserService } from '../../core/application/useCases/updateUser/UpdateUserService'
import { User } from '../../core/domain/User'
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
export class UserResolvers {
  constructor(
    private readonly loginUserService: LoginUserService,
    private readonly registerUserService: RegisterUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Mutation(() => User)
  deleteUser(@Args('input') input: DeleteUserInput) {
    return this.deleteUserService.execute(input)
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.updateUserService.execute(input)
  }

  @Mutation(() => User)
  registerUser(@Args('input') input: RegisterUserInput) {
    return this.registerUserService.execute(input)
  }

  @Mutation(() => User)
  loginUser(@Args('input') input: LoginUserInput) {
    return this.loginUserService.execute(input)
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
