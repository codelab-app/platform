import { CreateResponse } from '@codelab/backend/application'
import {
  CurrentUser,
  GqlAuthGuard,
  Roles,
  RolesGuard,
} from '@codelab/backend/infra'
import type { User as IUser } from '@codelab/shared/abstract/core'
import { Role } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserAdapter } from '../domain/user.adapter'
import { User } from '../domain/user.model'
import { DeleteUserInput, DeleteUserService } from '../use-cases/delete-user'
import { GetUserInput, GetUserService } from '../use-cases/get-user'
import { GetUsersInput, GetUsersService } from '../use-cases/get-users'
import { UpsertUserInput, UpsertUserService } from '../use-cases/upsert-user'

@Resolver(() => User)
@Injectable()
export class UserResolver {
  constructor(
    private deleteUserService: DeleteUserService,
    private getUserService: GetUserService,
    private getUsersService: GetUsersService,
    private upsertUserService: UpsertUserService,
    private userAdapter: UserAdapter,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getMe(@CurrentUser() currentUser: IUser) {
    return this.getUserService.execute({ id: currentUser.id })
  }

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args('input') input: GetUserInput) {
    const user = await this.getUserService.execute(input)

    if (!user) {
      return null
    }

    return this.userAdapter.mapItem(user)
  }

  @Query(() => [User])
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async getUsers(@Args('input', { nullable: true }) input?: GetUsersInput) {
    return await this.getUsersService.execute(input)
  }

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  async upsertUser(
    @Args('input') input: UpsertUserInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return await this.upsertUserService.execute({ input, currentUser })
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteUser(
    @Args('input') input: DeleteUserInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.deleteUserService.execute({ input, currentUser })
  }
}
