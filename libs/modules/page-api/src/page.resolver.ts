import { DeleteResponse } from '@codelab/backend'
import { JwtPayload } from '@codelab/backend/adapters'
import { CurrentUser, GqlAuthGuard } from '@codelab/modules/auth-api'
import { ElementAggregate } from '@codelab/modules/element-api'
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
  DeletePageInput,
  DeletePageService,
  GetPageInput,
  GetPageRootService,
  GetPageService,
  GetPagesInput,
  GetPagesService,
  UpdatePageInput,
  UpdatePageService,
} from './use-cases'

@Resolver(() => Page)
@Injectable()
export class PageResolver {
  constructor(
    private createPageService: CreatePageService,
    private getPageRootService: GetPageRootService,
    private getPagesService: GetPagesService,
    private updatePageService: UpdatePageService,
    private getPageService: GetPageService,
    private deletePageService: DeletePageService,
  ) {}

  @Query(() => [Page])
  @UseGuards(GqlAuthGuard)
  getPages(
    @Args('input') input: GetPagesInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    const r = this.getPagesService.execute({ input, currentUser })
    console.log(r)

    return r
  }

  @Query(() => Page, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getPage(
    @Args('input') input: GetPageInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.getPageService.execute({ input, currentUser })
  }

  @Mutation(() => Page)
  @UseGuards(GqlAuthGuard)
  createPage(
    @Args('input') input: CreatePageInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.createPageService.execute({ input, currentUser })
  }

  @Mutation(() => DeleteResponse)
  @UseGuards(GqlAuthGuard)
  deletePage(
    @Args('input') input: DeletePageInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.deletePageService.execute({ input, currentUser })
  }

  @Mutation(() => Page)
  @UseGuards(GqlAuthGuard)
  updatePage(
    @Args('input') input: UpdatePageInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.updatePageService.execute({ input, currentUser })
  }

  @ResolveField('rootElement', () => ElementAggregate)
  resolveRootElement(
    @Parent() page: Page,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.getPageRootService.execute({
      input: {
        pageId: page.id,
      },
      currentUser,
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
