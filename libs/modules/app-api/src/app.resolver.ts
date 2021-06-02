import type { JwtPayload } from '@codelab/modules/auth-api'
import { CurrentUser, GqlAuthGuard } from '@codelab/modules/auth-api'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { App } from './app.model'
import {
  CreateAppInput,
  CreateAppService,
  DeleteAppInput,
  DeleteAppService,
  GetAppInput,
  GetAppService,
  GetAppsService,
  UpdateAppInput,
  UpdateAppService,
} from './use-cases'

@Resolver(() => App)
@Injectable()
export class AppResolver {
  constructor(
    private readonly createAppService: CreateAppService,
    private readonly getAppsService: GetAppsService,
    private readonly getAppService: GetAppService,
    private readonly updateAppService: UpdateAppService,
    private readonly deleteAppService: DeleteAppService,
  ) {}

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  createApp(
    @Args('input') input: CreateAppInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.createAppService.execute({ input, ownerId: user.sub })
  }

  @Query(() => App, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getApp(
    @Args('input') input: GetAppInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.getAppService.execute({
      input,
      currentUser,
    })
  }

  @Query(() => [App])
  @UseGuards(GqlAuthGuard)
  getApps(@CurrentUser() user: JwtPayload) {
    return this.getAppsService.execute({ ownerId: user.sub })
  }

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  updateApp(
    @Args('input') input: UpdateAppInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.updateAppService.execute({ input, currentUser })
  }

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  deleteApp(
    @Args('input') input: DeleteAppInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.deleteAppService.execute({ input, currentUser })
  }

  // @ResolveField('pages', () => [Page])
  // pages(@Parent() app: App) {
  //   return this.prismaService.page.findMany({
  //     where: {
  //       appId: app.id,
  //     },
  //   })
  // }

  // @ResolveField('lambdas', () => [Lambda])
  // lambdas(@Parent() app: App) {
  //   return this.prismaService.lambda.findMany({
  //     where: {
  //       appId: app.id,
  //     },
  //   })
  // }
}
