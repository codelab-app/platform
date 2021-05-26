import { DeleteResponse, GqlAuthGuard } from '@codelab/backend'
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
} from './use-cases'

@Resolver(() => PageElementRoot)
@Injectable()
export class PageElementResolver {
  constructor(
    private createPageElementService: CreatePageElementService,
    private getPageElementService: GetPageElementService,
    private getPageElementRootService: GetPageElementRootService,
    private deletePageElementService: DeletePageElementService,
  ) {}

  @Mutation(() => PageElement)
  @UseGuards(GqlAuthGuard)
  createPageElement(@Args('input') input: CreatePageElementInput) {
    return this.createPageElementService.execute(input)
  }

  @Mutation(() => DeleteResponse, {
    description: 'Deletes a page element and all the descending page elements',
  })
  @UseGuards(GqlAuthGuard)
  deletePageElement(@Args('input') input: DeletePageElementInput) {
    return this.deletePageElementService.execute(input)
  }

  @Query(() => PageElement, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getPageElement(@Args('input') input: GetPageElementInput) {
    return this.getPageElementService.execute(input)
  }

  @Query(() => PageElementRoot, {
    nullable: true,
    description:
      'Aggregates the requested page element and all of its descendant elements (infinitely deep) in the form of array of PageElement and array of PageElementLink',
  })
  @UseGuards(GqlAuthGuard)
  getPageElementRoot(@Args('input') input: GetPageElementRootInput) {
    return this.getPageElementRootService.execute(input)
  }
}
