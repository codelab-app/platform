import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Graph } from '../../../../graph/src/core/domain/graph/Graph'
import { CreatePageInput } from '../../core/application/useCases/createPage/CreatePageInput'
import { CreatePageService } from '../../core/application/useCases/createPage/CreatePageService'
import { DeletePageInput } from '../../core/application/useCases/deletePage/DeletePageInput'
import { DeletePageService } from '../../core/application/useCases/deletePage/DeletePageService'
import { GetPageInput } from '../../core/application/useCases/getPage/GetPageInput'
import { GetPageService } from '../../core/application/useCases/getPage/GetPageService'
import { GetPagesInput } from '../../core/application/useCases/getPages/GetPagesInput'
import { GetPagesService } from '../../core/application/useCases/getPages/GetPagesService'
import { UpdatePageInput } from '../../core/application/useCases/updatePage/UpdatePageInput'
import { UpdatePageService } from '../../core/application/useCases/updatePage/UpdatePageService'
import { Page } from '../../core/domain/Page'
import { CurrentUser, GqlAuthGuard, PrismaService } from '@codelab/backend'
import { User } from '@codelab/modules/user'

@Resolver(() => Page)
@Injectable()
export class PageResolvers {
  constructor(
    private readonly getPagesService: GetPagesService,
    private readonly getPageService: GetPageService,
    private readonly createPageService: CreatePageService,
    private readonly updatePageService: UpdatePageService,
    private readonly deletePageService: DeletePageService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Page)
  @UseGuards(GqlAuthGuard)
  createPage(@Args('input') input: CreatePageInput) {
    return this.createPageService.execute(input)
  }

  @Mutation(() => Page)
  @UseGuards(GqlAuthGuard)
  updatePage(@Args('input') input: UpdatePageInput) {
    return this.updatePageService.execute(input)
  }

  @Query(() => [Page])
  @UseGuards(GqlAuthGuard)
  getPages(@Args('input') input: GetPagesInput, @CurrentUser() user: User) {
    return this.getPagesService.execute(input)
  }

  @Query(() => Page)
  @UseGuards(GqlAuthGuard)
  getPage(@Args('input') input: GetPageInput) {
    return this.getPageService.execute(input)
  }

  @Mutation(() => Page)
  deletePage(@Args('input') input: DeletePageInput) {
    return this.deletePageService.execute(input)
  }

  @ResolveField(() => [Graph])
  graphs(@Parent() page: Page) {
    return this.prismaService.graph.findMany({
      where: {
        page: {
          id: page.id,
        },
      },
    })
  }
}
