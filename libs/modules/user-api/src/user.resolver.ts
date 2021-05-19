import {
  CurrentUser,
  GqlAuthGuard,
  IsOwnerAuthGuard,
  JwtPayload,
} from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  CreateUserInput,
  CreateUserService,
  DeleteUsersInput,
  DeleteUsersService,
  GetMeService,
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
    private createService: CreateUserService,
    private updateService: UpdateUserService,
    private deleteService: DeleteUsersService,
    private getMeService: GetMeService,
    private getUsersService: GetUsersService,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getMe(@CurrentUser() currentUser: JwtPayload) {
    return this.getMeService.execute({ userId: currentUser.sub })
  }

  //TODO require admin
  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  getUsers(@Args('input', { nullable: true }) input?: GetUsersInput) {
    return this.getUsersService.execute(input)
  }

  @Mutation(() => User)
  createUser(
    @Args('input') input: CreateUserInput,
    @Args('upsert', { nullable: true, defaultValue: false }) upsert: boolean,
  ) {
    return this.createService.execute({
      input,
      upsert,
    })
  }

  @Mutation(() => User)
  @UseGuards(
    GqlAuthGuard,
    new IsOwnerAuthGuard(({ input }: { input: UpdateUserInput }) => input.id),
  )
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.updateService.execute(input)
  }

  @Mutation(() => User)
  @UseGuards(
    GqlAuthGuard,
    new IsOwnerAuthGuard(({ input }: { input: UpdateUserInput }) => input.id),
  )
  deleteUsers(@Args('input') input: DeleteUsersInput) {
    return this.deleteService.execute(input)
  }
}
