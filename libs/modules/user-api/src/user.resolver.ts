import {
  CurrentUser,
  GqlAuthGuard,
  GqlRoleGuard,
  IsOwnerAuthGuard,
  JwtPayload,
  Role,
} from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  DeleteUserInput,
  DeleteUserService,
  GetUserService,
  GetUsersInput,
  GetUsersService,
  UpdateUserInput,
  UpdateUserService,
} from './use-cases'
import { User } from './user.model'

@Resolver(() => User)
@Injectable()
export class UserResolver {
  constructor(
    private updateService: UpdateUserService,
    private deleteService: DeleteUserService,
    private getUserService: GetUserService,
    private getUsersService: GetUsersService,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getMe(@CurrentUser() currentUser: JwtPayload) {
    return this.getUserService.execute({ userId: currentUser.sub })
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard, GqlRoleGuard([Role.ADMIN]))
  getUsers(@Args('input', { nullable: true }) input?: GetUsersInput) {
    return this.getUsersService.execute(input)
  }

  @Mutation(() => User)
  @UseGuards(
    GqlAuthGuard,
    IsOwnerAuthGuard(
      ({ input }: { input: UpdateUserInput }) => input.userId,
      [Role.ADMIN],
    ),
  )
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.updateService.execute(input)
  }

  @Mutation(() => Boolean)
  @UseGuards(
    GqlAuthGuard,
    IsOwnerAuthGuard(
      ({ input }: { input: DeleteUserInput }) => input.userId,
      [Role.ADMIN],
    ),
  )
  deleteUser(@Args('input') input: DeleteUserInput) {
    return this.deleteService.execute(input)
  }
}
