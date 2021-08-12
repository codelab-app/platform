import {
  CreateResponse,
  CurrentUser,
  DgraphApp,
  GqlAuthGuard,
  JwtPayload,
  Void,
} from '@codelab/backend/infra'
import { ArrayMapper } from '@codelab/shared/utils'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AppMapper } from './app.mapper'
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
  private appsMapper: ArrayMapper<DgraphApp, App>

  constructor(
    private readonly createAppService: CreateAppService,
    private readonly getAppsService: GetAppsService,
    private readonly getAppService: GetAppService,
    private readonly updateAppService: UpdateAppService,
    private readonly deleteAppService: DeleteAppService,
    private readonly appMapper: AppMapper,
  ) {
    this.appsMapper = new ArrayMapper(appMapper)
  }

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createApp(
    @Args('input') input: CreateAppInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.createAppService.execute({ input, ownerId: user.sub })
  }

  @Query(() => App, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getApp(
    @Args('input') input: GetAppInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    const app = await this.getAppService.execute({
      input,
      currentUser,
    })

    if (!app) {
      return null
    }

    return this.appMapper.map(app)
  }

  @Query(() => [App])
  @UseGuards(GqlAuthGuard)
  async getApps(@CurrentUser() user: JwtPayload) {
    const apps = await this.getAppsService.execute({ ownerId: user.sub })

    return this.appsMapper.map(apps)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateApp(
    @Args('input') input: UpdateAppInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    await this.updateAppService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteApp(
    @Args('input') input: DeleteAppInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    await this.deleteAppService.execute({ input, currentUser })
  }
}
