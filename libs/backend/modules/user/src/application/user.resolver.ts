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
import { User } from '../domain/user.model'
import { CreateUserInput, CreateUserService } from '../use-cases/create-user'
import { DeleteUserInput, DeleteUserService } from '../use-cases/delete-user'
import { GetUserService } from '../use-cases/get-user'
import { GetUsersInput, GetUsersService } from '../use-cases/get-users'
import { UpdateUserInput, UpdateUserService } from '../use-cases/update-user'

@Resolver(() => User)
@Injectable()
export class UserResolver {
  constructor(
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
    private getUserService: GetUserService,
    private getUsersService: GetUsersService,
    private createUserService: CreateUserService,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getMe(@CurrentUser() currentUser: IUser) {
    return this.getUserService.execute({ userId: currentUser.id })
  }

  @Query(() => [User])
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard, RolesGuard)
  getUsers(@Args('input', { nullable: true }) input?: GetUsersInput) {
    return this.getUsersService.execute(input)
  }

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  async createUser(
    @Args('input') input: CreateUserInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return await this.createUserService.execute({ input, currentUser })
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args('input') input: UpdateUserInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.updateUserService.execute({ input, currentUser })
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
