import { GqlAuthGuard } from '@codelab/backend'
import { IsAppOwnerAuthGuard } from '@codelab/modules/app-api'
import {
  GetPageElementRootService,
  PageElementRoot,
} from '@codelab/modules/page-element-api'
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
import {
  CreatePageInput,
  CreatePageService,
  GetPageInput,
  GetPageService,
  GetPagesInput,
  GetPagesService,
} from './use-cases'

@Resolver(() => Page)
@Injectable()
export class PageResolver {
  constructor(
    private createPageService: CreatePageService,
    private getPageElementRootService: GetPageElementRootService,
    private getPagesService: GetPagesService,
    private getPageService: GetPageService,
  ) {}

  @Query(() => [Page])
  @UseGuards(
    GqlAuthGuard,
    IsAppOwnerAuthGuard(({ input }: { input: GetPagesInput }) => input.appId),
  )
  getPages(@Args('input') input: GetPagesInput) {
    return this.getPagesService.execute(input)
  }

  @Query(() => Page, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getPage(@Args('input') input: GetPageInput) {
    return this.getPageService.execute(input)
  }

  @Mutation(() => Page)
  @UseGuards(
    GqlAuthGuard,
    IsAppOwnerAuthGuard(({ input }: { input: CreatePageInput }) => input.appId),
  )
  createPage(@Args('input') input: CreatePageInput) {
    return this.createPageService.execute(input)
  }

  @ResolveField('rootElement', () => PageElementRoot)
  getRootElement(@Parent() page: Page) {
    return this.getPageElementRootService.execute({
      pageElementId: page.rootElement.id,
    })
  }

  // @Query(() => Page, { nullable: true })
  // @UseGuards(
  //   GqlAuthGuard,
  //   IsAppOwnerAuthGuard(({ input }: { input: GetAppInput }) => input.appId),
  // )
  // getApp(@Args('input') input: GetAppInput) {
  //   return this.getAppService.execute(input)
  // }
}
