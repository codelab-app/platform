import { GqlAuthGuard, RolesGuard } from '@codelab/backend/infra'
import type { IUser } from '@codelab/shared/abstract/core'
import { Role } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '../domain/user.model'
import { CurrentUser, Roles } from '../infra/auth'
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
  ) {}

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getMe(@CurrentUser() currentUser: IUser) {
    return this.getUserService.execute({ id: currentUser.id })
  }

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getUser(@Args('input') input: GetUserInput) {
    return this.getUserService.execute(input)
  }

  @Query(() => [User])
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  getUsers(@Args('input', { nullable: true }) input?: GetUsersInput) {
    return this.getUsersService.execute(input)
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async upsertUser(@Args('input') input: UpsertUserInput) {
    const { id } = await this.upsertUserService.execute({ input })

    return this.getUserService.execute({ id })
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
