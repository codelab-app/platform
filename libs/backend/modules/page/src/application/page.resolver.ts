import { Void } from '@codelab/backend/abstract/types'
import {
  ElementGraph,
  ElementTreeAdapter,
  GetElementGraphService,
} from '@codelab/backend/modules/element'
import { CurrentUser, GqlAuthGuard } from '@codelab/backend/modules/user'
import type { User } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Page } from '../domain/page.model'
import { CreatePageInput, CreatePageService } from '../use-cases/create-page'
import { DeletePageInput, DeletePageService } from '../use-cases/delete-page'
import { GetPageInput, GetPageService } from '../use-cases/get-page'
import { GetPagesInput, GetPagesService } from '../use-cases/get-pages'
import { UpdatePageInput, UpdatePageService } from '../use-cases/update-page'
import { PageAdapter } from './page.adapter'

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
    private elementTreeAdapter: ElementTreeAdapter,
  ) {}

  @Mutation(() => Page)
  @UseGuards(GqlAuthGuard)
  async createPage(
    @Args('input') input: CreatePageInput,
    @CurrentUser() currentUser: User,
  ) {
    const page = await this.createPageService.execute({ input, currentUser })

    if (!page) {
      return new Error('Page not created')
    }

    return this.pageAdapter.mapItem(page)
  }

  @Query(() => [Page])
  @UseGuards(GqlAuthGuard)
  async getPages(
    @Args('input') input: GetPagesInput,
    @CurrentUser() currentUser: User,
  ) {
    const pages = await this.getPagesService.execute({ input, currentUser })

    return this.pageAdapter.map(pages)
  }

  @Query(() => Page, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getPage(
    @Args('input') input: GetPageInput,
    @CurrentUser() currentUser: User,
  ) {
    const page = await this.getPageService.execute({ input, currentUser })

    if (!page) {
      return null
    }

    return this.pageAdapter.mapItem(page)
  }

  @Mutation(() => Page, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deletePage(
    @Args('input') input: DeletePageInput,
    @CurrentUser() currentUser: User,
  ) {
    const page = await this.deletePageService.execute({ input, currentUser })

    if (!page) {
      throw new Error('Page not found')
    }

    return this.pageAdapter.mapItem(page)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updatePage(
    @Args('input') input: UpdatePageInput,
    @CurrentUser() currentUser: User,
  ) {
    await this.updatePageService.execute({ input, currentUser })
  }

  @ResolveField('elements', () => ElementGraph, { nullable: true })
  async resolveElements(
    @Parent() page: Page,
    @CurrentUser() currentUser: User,
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

    return this.elementTreeAdapter.mapItem(element)
  }

  // The Page.app resolver is in app-api/../PageAppResolver
}
