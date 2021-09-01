import { Void } from '@codelab/backend/abstract/types'
import { CreateResponse } from '@codelab/backend/application'
import { CurrentUser, GqlAuthGuard } from '@codelab/backend/infra'
import type { User } from '@codelab/shared/abstract/core'
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
  createApp(@Args('input') input: CreateAppInput, @CurrentUser() user: User) {
    return this.createAppService.execute({ input, currentUser: user })
  }

  @Query(() => App, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getApp(
    @Args('input') input: GetAppInput,
    @CurrentUser() currentUser: User,
  ) {
    const app = await this.getAppService.execute({
      input,
      currentUser: currentUser,
    })

    if (!app) {
      return null
    }

    return this.appAdapter.mapItem(app)
  }

  @Query(() => [App])
  @UseGuards(GqlAuthGuard)
  async getApps(@CurrentUser() user: User) {
    const apps = await this.getAppsService.execute({ currentUser: user })

    return this.appAdapter.map(apps)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateApp(
    @Args('input') input: UpdateAppInput,
    @CurrentUser() currentUser: User,
  ) {
    await this.updateAppService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteApp(
    @Args('input') input: DeleteAppInput,
    @CurrentUser() currentUser: User,
  ) {
    await this.deleteAppService.execute({ input, currentUser })
  }
}
