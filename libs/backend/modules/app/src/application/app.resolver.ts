import {
  PayloadResponse,
  Transaction,
  Transactional,
} from '@codelab/backend/application'
import { GqlAuthGuard, ITransaction } from '@codelab/backend/infra'
import { GetPagesService, Page } from '@codelab/backend/modules/page'
import { CurrentUser } from '@codelab/backend/modules/user'
import type { IUser } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { CreateAppInput, CreateAppService } from '../use-cases/create-app'
import { DeleteAppInput, DeleteAppService } from '../use-cases/delete-app'
import { ExportAppInput, ExportAppService } from '../use-cases/export-app'
import { GetAppInput, GetAppService } from '../use-cases/get-app'
import { GetAppsService } from '../use-cases/get-apps'
import { ImportAppInput, ImportAppService } from '../use-cases/import-app'
import { UpdateAppInput, UpdateAppService } from '../use-cases/update-app'
import { App } from './app.model'

@Resolver(() => App)
@Injectable()
export class AppResolver {
  constructor(
    private readonly createAppService: CreateAppService,
    private readonly getAppsService: GetAppsService,
    private readonly getAppService: GetAppService,
    private readonly updateAppService: UpdateAppService,
    private readonly deleteAppService: DeleteAppService,
    private readonly exportAppService: ExportAppService,
    private readonly importAppService: ImportAppService,
    private readonly getPagesService: GetPagesService,
  ) {}

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  async createApp(
    @Args('input') input: CreateAppInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createAppService.execute({ input, currentUser })

    return this.getAppService.execute({
      input: { byId: { appId: id } },
      currentUser,
    })
  }

  @Query(() => App, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getApp(
    @Args('input') input: GetAppInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const app = await this.getAppService.execute({
      input,
      currentUser: currentUser,
    })

    if (!app) {
      return null
    }

    return app
  }

  @Query(() => [App])
  @UseGuards(GqlAuthGuard)
  async getApps(@CurrentUser() currentUser: IUser) {
    return this.getAppsService.execute({ currentUser })
  }

  @Mutation(() => App, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateApp(
    @Args('input') input: UpdateAppInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updateAppService.execute({ input, currentUser })

    const { id } = input

    const app = await this.getAppService.execute({
      input: { byId: { appId: id } },
      currentUser,
    })

    if (!app) {
      throw new Error('App not found')
    }

    return app
  }

  @Mutation(() => App, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteApp(
    @Args('input') input: DeleteAppInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { appId } = input

    const app = await this.getAppService.execute({
      input: { byId: { appId } },
      currentUser,
    })

    if (!app) {
      throw new Error('App not found')
    }

    await this.deleteAppService.execute({ input, currentUser })

    return app
  }

  @Query(() => PayloadResponse)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async exportApp(
    @Args('input') input: ExportAppInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ): Promise<PayloadResponse> {
    const payload = await this.exportAppService.execute({
      input,
      currentUser,
      transaction,
    })

    return {
      payload: JSON.stringify(payload),
    }
  }

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async importApp(
    @Args('input') input: ImportAppInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const { id } = await this.importAppService.execute({
      input,
      currentUser,
      transaction,
    })

    const app = await this.getAppService.execute({
      input: { byId: { appId: id } },
      currentUser: currentUser,
    })

    if (!app) {
      throw new Error("Couldn't find imported app")
    }

    return app
  }

  @ResolveField('pages', () => [Page])
  @UseGuards(GqlAuthGuard)
  async resolvePages(@Parent() parent: App, @CurrentUser() currentUser: IUser) {
    return this.getPagesService.execute({
      input: { byApp: { appId: parent.id } },
      currentUser,
    })
  }
}
