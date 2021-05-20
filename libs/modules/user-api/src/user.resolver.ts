import {
  CurrentUser,
  GqlAuthGuard,
  IsOwnerAuthGuard,
  JwtPayload,
} from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { boolean } from '@storybook/addon-knobs'
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

  //TODO require admin
  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  getUsers(@Args('input', { nullable: true }) input?: GetUsersInput) {
    return this.getUsersService.execute(input)
  }

  @Mutation(() => User)
  @UseGuards(
    GqlAuthGuard,
    new IsOwnerAuthGuard(
      ({ input }: { input: UpdateUserInput }) => input.userId,
    ),
  )
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.updateService.execute(input)
  }

  @Mutation(() => Boolean)
  //TODO allow admin to delete and update all
  @UseGuards(
    GqlAuthGuard,
    new IsOwnerAuthGuard(
      ({ input }: { input: DeleteUserInput }) => input.userId,
    ),
  )
  deleteUser(@Args('input') input: DeleteUserInput) {
    return this.deleteService.execute(input)
  }
}
