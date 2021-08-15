import {
  CreateResponse,
  CurrentUser,
  GqlAuthGuard,
  JwtPayload,
  Void,
} from '@codelab/backend/infra'
import {
  ElementGraph,
  ElementTreeAdapter,
  GetElementGraphService,
} from '@codelab/backend/modules/element'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { PageAdapter } from './page.adapter'
import { Page } from './page.model'
import {
  CreatePageInput,
  CreatePageService,
  DeletePageInput,
  DeletePageService,
  GetPageInput,
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
    private getPagesService: GetPagesService,
    private updatePageService: UpdatePageService,
    private getPageService: GetPageService,
    private deletePageService: DeletePageService,
    private pageAdapter: PageAdapter,
    private getElementService: GetElementGraphService,
    private elementTransformer: ElementTreeAdapter,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createPage(
    @Args('input') input: CreatePageInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.createPageService.execute({ input, currentUser })
  }

  @Query(() => [Page])
  @UseGuards(GqlAuthGuard)
  async getPages(
    @Args('input') input: GetPagesInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    const pages = await this.getPagesService.execute({ input, currentUser })

    return this.pageAdapter.map(pages)
  }

  @Query(() => Page, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getPage(
    @Args('input') input: GetPageInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    const page = await this.getPageService.execute({ input, currentUser })

    if (!page) {
      return null
    }

    return this.pageAdapter.map(page)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deletePage(
    @Args('input') input: DeletePageInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    await this.deletePageService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updatePage(
    @Args('input') input: UpdatePageInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    await this.updatePageService.execute({ input, currentUser })
  }

  @ResolveField('elements', () => ElementGraph, { nullable: true })
  async resolveElements(
    @Parent() page: Page,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<ElementGraph | null> {
    const dgraphPage = await this.getPageService.execute({
      input: { pageId: page.id },
      currentUser,
    })

    if (!dgraphPage) {
      return null
    }

    const element = await this.getElementService.execute({
      input: { elementId: dgraphPage.root.uid },
      currentUser,
    })

    if (!element) {
      return null
    }

    return this.elementTransformer.map(element)
  }

  // The Page.app resolver is in app-api/../PageAppResolver
}
