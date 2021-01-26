import { Inject, Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateAppInput } from '../../core/application/useCases/createApp/CreateAppInput'
import { CreateAppService } from '../../core/application/useCases/createApp/CreateAppService'
import { DeleteAppInput } from '../../core/application/useCases/deleteApp/DeleteAppInput'
import { DeleteAppService } from '../../core/application/useCases/deleteApp/DeleteAppService'
import { GetAppInput } from '../../core/application/useCases/getApp/GetAppInput'
import { GetAppService } from '../../core/application/useCases/getApp/GetAppService'
import { GetAppsService } from '../../core/application/useCases/getApps/GetAppsService'
import { UpdateAppInput } from '../../core/application/useCases/updateApp/UpdateAppInput'
import { UpdateAppService } from '../../core/application/useCases/updateApp/UpdateAppService'
import { App } from '../../core/domain/App'
import { AppDITokens } from '../../framework/AppDITokens'
import { CurrentUser, GqlAuthGuard } from '@codelab/backend'
import { User } from '@codelab/modules/user'

@Resolver('App')
@Injectable()
export class AppGraphqlAdapter {
  constructor(
    @Inject(AppDITokens.CreateAppUseCase)
    readonly createAppService: CreateAppService,
    @Inject(AppDITokens.GetAppUseCase)
    readonly getAppService: GetAppService,
    @Inject(AppDITokens.GetAppsUseCase)
    readonly getAppsService: GetAppsService,
    @Inject(AppDITokens.UpdateAppUseCase)
    readonly updateAppService: UpdateAppService,
    @Inject(AppDITokens.DeleteAppUseCase)
    readonly deleteAppService: DeleteAppService,
  ) {}

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  async createApp(
    @Args('input') input: CreateAppInput,
    @CurrentUser() user: User,
  ) {
    return await this.createAppService.execute({ ...input, user })
  }

  @Query(() => App, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getApp(@Args('input') input: GetAppInput) {
    return await this.getAppService.execute({ ...input })
  }

  @Query(() => [App])
  @UseGuards(GqlAuthGuard)
  async getApps(@CurrentUser() user: User) {
    return await this.getAppsService.execute({ user })
  }

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  async updateApp(
    @Args('input') { id, ...input }: UpdateAppInput,
    @CurrentUser() user: User,
  ) {
    return await this.updateAppService.execute({
      appId: id,
      userId: user.id,
      ...input,
    })
  }

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  async deleteApp(@Args('input') input: DeleteAppInput) {
    return await this.deleteAppService.execute(input)
  }
}
