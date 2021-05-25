import { GqlAuthGuard } from '@codelab/backend'
import { App, IsAppOwnerAuthGuard } from '@codelab/modules/app-api'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Page } from './page.model'
import { CreatePageInput, CreatePageService } from './use-cases'

@Resolver(() => Page)
@Injectable()
export class PageResolver {
  constructor(private createPageService: CreatePageService) {}

  @Mutation(() => Page)
  @UseGuards(
    GqlAuthGuard,
    IsAppOwnerAuthGuard(({ input }: { input: CreatePageInput }) => input.appId),
  )
  createPage(@Args('input') input: CreatePageInput) {
    return this.createPageService.execute(input)
  }

  // @ResolveField('app', (returns) => App)
  // getApp(@Parent() { id }: Page) {}

  // @Query(() => Page, { nullable: true })
  // @UseGuards(
  //   GqlAuthGuard,
  //   IsAppOwnerAuthGuard(({ input }: { input: GetAppInput }) => input.appId),
  // )
  // getApp(@Args('input') input: GetAppInput) {
  //   return this.getAppService.execute(input)
  // }
}
