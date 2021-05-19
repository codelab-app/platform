import {
  CurrentUser,
  GqlAuthGuard,
  IsOwnerAuthGuard,
  JwtPayload,
} from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserInput, CreateUserService } from './use-cases'
import { DeleteUserInput, DeleteUserService } from './use-cases/delete-user'
import { GetMeService } from './use-cases/get-me'
import { UpdateUserInput, UpdateUserService } from './use-cases/update-user'
import { User } from './user.model'

@Resolver(() => User)
@Injectable()
export class UserResolver {
  constructor(
    private createService: CreateUserService,
    private updateService: UpdateUserService,
    private deleteService: DeleteUserService,
    private getMeService: GetMeService,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getMe(@CurrentUser() currentUser: JwtPayload) {
    return this.getMeService.execute({ userId: currentUser.sub })
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
  deleteUser(@Args('input') input: DeleteUserInput) {
    return this.deleteService.execute(input)
  }
}
