import {
  CurrentUser,
  GqlAuthGuard,
  GqlRoleGuard,
  JwtPayload,
  Role,
} from '@codelab/backend/infra'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '../domain/user.model'
import { DeleteUserInput, DeleteUserService } from '../use-cases/delete-user'
import { GetUserService } from '../use-cases/get-user'
import { GetUsersInput, GetUsersService } from '../use-cases/get-users'
import { UpdateUserInput, UpdateUserService } from '../use-cases/update-user'

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
