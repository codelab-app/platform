import {
  CreateResponse,
  CurrentUser,
  GqlAuthGuard,
  JwtPayload,
  Void,
} from '@codelab/backend/infra'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { App } from '../domain/app.model'
import { CreateAppInput, CreateAppService } from '../use-cases/create-app'
import { DeleteAppInput, DeleteAppService } from '../use-cases/delete-app'
import { GetAppInput, GetAppService } from '../use-cases/get-app'
import { GetAppsService } from '../use-cases/get-apps'
import { UpdateAppInput, UpdateAppService } from '../use-cases/update-app'
import { AppAdapter } from './app.adapter'

@Resolver(() => App)
@Injectable()
export class AppResolver {
  constructor(
    private readonly createAppService: CreateAppService,
    private readonly getAppsService: GetAppsService,
    private readonly getAppService: GetAppService,
    private readonly updateAppService: UpdateAppService,
    private readonly deleteAppService: DeleteAppService,
    private readonly appAdapter: AppAdapter,
  ) {}

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

    return this.appAdapter.map(app)
  }

  @Query(() => [App])
  @UseGuards(GqlAuthGuard)
  async getApps(@CurrentUser() user: JwtPayload) {
    const apps = await this.getAppsService.execute({ ownerId: user.sub })

    return this.appAdapter.map(apps)
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
