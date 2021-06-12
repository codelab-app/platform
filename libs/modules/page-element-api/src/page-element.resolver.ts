import { DeleteResponse } from '@codelab/backend'
import type { JwtPayload } from '@codelab/modules/auth-api'
import { CurrentUser, GqlAuthGuard } from '@codelab/modules/auth-api'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PageElement, PageElementRoot } from './models'
import {
  CreatePageElementInput,
  CreatePageElementService,
  DeletePageElementInput,
  DeletePageElementService,
  GetPageElementInput,
  GetPageElementRootInput,
  GetPageElementRootService,
  GetPageElementService,
  MovePageElementInput,
  MovePageElementService,
  UpdatePageElementInput,
  UpdatePageElementService,
} from './use-cases'

@Resolver(() => PageElement)
@Injectable()
export class PageElementResolver {
  constructor(
    private createPageElementService: CreatePageElementService,
    private getPageElementService: GetPageElementService,
    private getPageElementRootService: GetPageElementRootService,
    private deletePageElementService: DeletePageElementService,
    private updatePageElementService: UpdatePageElementService,
    private movePageElementService: MovePageElementService,
  ) {}

  @Mutation(() => PageElement)
  @UseGuards(GqlAuthGuard)
  createPageElement(
    @Args('input') input: CreatePageElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.createPageElementService.execute({ input, currentUser })
  }

  @Query(() => PageElement, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getPageElement(
    @Args('input') input: GetPageElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.getPageElementService.execute({ input, currentUser })
  }

  @Query(() => PageElementRoot, {
    nullable: true,
    description:
      'Aggregates the requested page element and all of its descendant elements (infinitely deep) in the form of array of PageElement and array of PageElementLink',
  })
  @UseGuards(GqlAuthGuard)
  getPageElementRoot(
    @Args('input') input: GetPageElementRootInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.getPageElementRootService.execute({ input, currentUser })
  }

  @Mutation(() => PageElement)
  @UseGuards(GqlAuthGuard)
  updatePageElement(
    @Args('input') input: UpdatePageElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.updatePageElementService.execute({ input, currentUser })
  }

  @Mutation(() => PageElement)
  @UseGuards(GqlAuthGuard)
  movePageElement(
    @Args('input') input: MovePageElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.movePageElementService.execute({ input, currentUser })
  }

  @Mutation(() => DeleteResponse, {
    description: 'Deletes a page element and all the descending page elements',
  })
  @UseGuards(GqlAuthGuard)
  deletePageElement(
    @Args('input') input: DeletePageElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.deletePageElementService.execute({ input, currentUser })
  }
}
