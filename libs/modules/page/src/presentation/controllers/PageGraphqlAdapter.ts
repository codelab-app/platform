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
import { Page } from '../../core/domain/Page'
import { CurrentUser, GqlAuthGuard, PrismaService } from '@codelab/backend'
import { User } from '@codelab/modules/user'

@Resolver(() => Page)
@Injectable()
export class PageGraphqlAdapter {
  constructor(
    private readonly getPagesService: GetPagesService,
    private getPageService: GetPageService,
    private readonly createPageService: CreatePageService,
    private readonly deletePageService: DeletePageService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Page)
  @UseGuards(GqlAuthGuard)
  async createPage(@Args('input') input: CreatePageInput) {
    return this.createPageService.execute(input)
  }

  @Query(() => [Page])
  @UseGuards(GqlAuthGuard)
  async getPages(
    @Args('input') input: GetPagesInput,
    @CurrentUser() user: User,
  ) {
    return this.getPagesService.execute(input)
  }

  @Query(() => Page)
  @UseGuards(GqlAuthGuard)
  async getPage(@Args('input') input: GetPageInput) {
    return this.getPageService.execute(input)
  }

  @Mutation(() => Page)
  async deletePage(@Args('input') input: DeletePageInput) {
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
