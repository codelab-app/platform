import type { JwtPayload } from '@codelab/backend'
import { CurrentUser, GqlAuthGuard, GqlRoleGuard, Role } from '@codelab/backend'
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
  @UseGuards(GqlAuthGuard, new GqlRoleGuard([Role.ADMIN]))
  getUsers(@Args('input', { nullable: true }) input?: GetUsersInput) {
    return this.getUsersService.execute(input)
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args('input') input: UpdateUserInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.updateService.execute({ input, currentUser })
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteUser(
    @Args('input') input: DeleteUserInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.deleteService.execute({ input, currentUser })
  }
}
