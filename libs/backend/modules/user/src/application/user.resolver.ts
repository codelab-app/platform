import { CreateResponse } from '@codelab/backend/application'
import type { User as IUser } from '@codelab/shared/abstract/core'
import { Role } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserAdapter } from '../domain/user.adapter'
import { User } from '../domain/user.model'
import { CurrentUser, GqlAuthGuard, Roles, RolesGuard } from '../infra/auth'
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

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getMe(@CurrentUser() currentUser: IUser) {
    const user = await this.getUserService.execute({ id: currentUser.id })

    if (!user) {
      return null
    }

    return this.userAdapter.mapItem(user)
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
  async upsertUser(@Args('input') input: UpsertUserInput) {
    return await this.upsertUserService.execute({ input })
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
