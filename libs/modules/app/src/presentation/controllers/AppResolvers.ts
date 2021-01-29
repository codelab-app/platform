import { Injectable, UseGuards } from '@nestjs/common'
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
import { CurrentUser, GqlAuthGuard } from '@codelab/backend'
import { User } from '@codelab/modules/user'

@Resolver('App')
@Injectable()
export class AppResolvers {
  constructor(
    private readonly createAppService: CreateAppService,
    private readonly getAppService: GetAppService,
    private readonly getAppsService: GetAppsService,
    private readonly updateAppService: UpdateAppService,
    private readonly deleteAppService: DeleteAppService,
  ) {}

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  createApp(@Args('input') input: CreateAppInput, @CurrentUser() user: User) {
    return this.createAppService.execute({ ...input, user })
  }

  @Query(() => App, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getApp(@Args('input') input: GetAppInput) {
    return this.getAppService.execute({ ...input })
  }

  @Query(() => [App])
  @UseGuards(GqlAuthGuard)
  getApps(@CurrentUser() user: User) {
    return this.getAppsService.execute({ user })
  }

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  updateApp(
    @Args('input') { id, ...input }: UpdateAppInput,
    @CurrentUser() user: User,
  ) {
    return this.updateAppService.execute({
      appId: id,
      userId: user.id,
      ...input,
    })
  }

  @Mutation(() => App)
  @UseGuards(GqlAuthGuard)
  deleteApp(@Args('input') input: DeleteAppInput) {
    return this.deleteAppService.execute(input)
  }
}
