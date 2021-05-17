import { Injectable } from '@nestjs/common'
import { Resolver } from '@nestjs/graphql'
import { App } from './app.model'
import { CreateAppService } from './use-cases/create-app/create-app.service'
import { DeleteAppService } from './use-cases/delete-app/delete-app.service'
import { GetAppsService } from './use-cases/get-apps/get-apps.service'
import { UpdateAppService } from './use-cases/update-app/update-app.service'

@Resolver(() => App)
@Injectable()
export class AppResolver {
  constructor(
    private readonly createAppService: CreateAppService,
    private readonly getAppsService: GetAppsService,
    private readonly updateAppService: UpdateAppService,
    private readonly deleteAppService: DeleteAppService,
  ) {}

  // @Mutation(() => App)
  // // @UseGuards(GqlAuthGuard)
  // createApp(@Args('input') input: CreateAppInput) {
  //   return this.createAppService.execute({ ...input, user })
  // }

  // @Query(() => App, { nullable: true })
  // @UseGuards(GqlAuthGuard)
  // getApp(@Args('input') input: GetAppInput) {
  //   return this.getAppService.execute({ ...input })
  // }

  // @Query(() => [App])
  // @UseGuards(GqlAuthGuard)
  // getApps(@CurrentUser() user: User) {
  //   return this.getAppsService.execute({ user })
  // }

  // @Mutation(() => App)
  // @UseGuards(GqlAuthGuard)
  // updateApp(
  //   @Args('input') { id, ...input }: UpdateAppInput,
  //   @CurrentUser() user: User,
  // ) {
  //   return this.updateAppService.execute({
  //     appId: id,
  //     user,
  //     ...input,
  //   })
  // }

  // @Mutation(() => App)
  // @UseGuards(GqlAuthGuard)
  // deleteApp(@Args('input') input: DeleteAppInput) {
  //   return this.deleteAppService.execute(input)
  // }

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
