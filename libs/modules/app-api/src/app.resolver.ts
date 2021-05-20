import { CurrentUser, GqlAuthGuard, JwtPayload } from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { App } from './app.model'
import { IsAppOwnerAuthGuard } from './auth/is-app-owner.guard'
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
  @UseGuards(
    GqlAuthGuard,
    IsAppOwnerAuthGuard(({ input }: { input: GetAppInput }) => input.appId),
  )
  getApp(@Args('input') input: GetAppInput) {
    return this.getAppService.execute(input)
  }

  @Query(() => [App])
  @UseGuards(GqlAuthGuard)
  getApps(@CurrentUser() user: JwtPayload) {
    return this.getAppsService.execute({ ownerId: user.sub })
  }

  @Mutation(() => App)
  @UseGuards(
    GqlAuthGuard,
    IsAppOwnerAuthGuard(({ input }: { input: UpdateAppInput }) => input.appId),
  )
  updateApp(@Args('input') input: UpdateAppInput) {
    return this.updateAppService.execute(input)
  }

  @Mutation(() => App)
  @UseGuards(
    GqlAuthGuard,
    IsAppOwnerAuthGuard(({ input }: { input: DeleteAppInput }) => input.appId),
  )
  deleteApp(@Args('input') input: DeleteAppInput) {
    return this.deleteAppService.execute(input)
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
