import { GqlAuthGuard } from '@codelab/backend/infra'
import {
  ElementGraph,
  GetElementGraphService,
} from '@codelab/backend/modules/element'
import { CurrentUser } from '@codelab/backend/modules/user'
import { IUser } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
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

@Resolver(() => Page)
@Injectable()
export class PageResolver {
  constructor(
    private createPageService: CreatePageService,
    private getPagesService: GetPagesService,
    private updatePageService: UpdatePageService,
    private getPageService: GetPageService,
    private deletePageService: DeletePageService,
    private getElementGraphService: GetElementGraphService,
  ) {}

  @Mutation(() => Page)
  @UseGuards(GqlAuthGuard)
  async createPage(
    @Args('input') input: CreatePageInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createPageService.execute({
      input,
      currentUser,
    })

    const page = await this.getPageService.execute({
      input: { pageId: id },
      currentUser,
    })

    if (!page) {
      throw new Error('Page not created')
    }

    return page
  }

  @Query(() => [Page])
  @UseGuards(GqlAuthGuard)
  async getPages(
    @Args('input') input: GetPagesInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.getPagesService.execute({ input, currentUser })
  }

  @Query(() => Page, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getPage(
    @Args('input') input: GetPageInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.getPageService.execute({ input, currentUser })
  }

  @Mutation(() => Page)
  @UseGuards(GqlAuthGuard)
  async deletePage(
    @Args('input') input: DeletePageInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { pageId } = input

    const page = await this.getPageService.execute({
      input: { pageId },
      currentUser,
    })

    if (!page) {
      throw new Error('Page not found')
    }

    await this.deletePageService.execute({ input, currentUser })

    return page
  }

  @Mutation(() => Page)
  @UseGuards(GqlAuthGuard)
  async updatePage(
    @Args('input') input: UpdatePageInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updatePageService.execute({ input, currentUser })

    const { pageId } = input

    const page = await this.getPageService.execute({
      input: { pageId },
      currentUser,
    })

    if (!page) {
      throw new Error('Page not found')
    }

    return page
  }

  @ResolveField('elements', () => ElementGraph, {
    defaultValue: {
      vertices: [],
      edges: [],
    },
    nullable: true,
  })
  async resolveElements(
    @Parent() page: Page,
    @CurrentUser() currentUser: IUser,
  ): Promise<Nullable<ElementGraph>> {
    const dgraphPage = await this.getPageService.execute({
      input: { pageId: page.id },
      currentUser,
    })

    if (!dgraphPage) {
      return null
    }

    return this.getElementGraphService.execute({
      input: { where: { id: dgraphPage.rootElementId } },
      currentUser,
    })
  }

  // The Page.app resolver is in app-api/../PageAppResolver
}
