import { Inject, Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePageInput } from '../../core/application/useCases/createPage/CreatePageInput'
import { CreatePageService } from '../../core/application/useCases/createPage/CreatePageService'
import { DeletePageInput } from '../../core/application/useCases/deletePage/DeletePageInput'
import { DeletePageService } from '../../core/application/useCases/deletePage/DeletePageService'
import { GetPageInput } from '../../core/application/useCases/getPage/GetPageInput'
import { GetPageService } from '../../core/application/useCases/getPage/GetPageService'
import { GetPagesInput } from '../../core/application/useCases/getPages/GetPagesInput'
import { GetPagesService } from '../../core/application/useCases/getPages/GetPagesService'
import { Page } from '../../core/domain/Page'
import { PageDITokens } from '../../framework/PageDITokens'
import { CurrentUser, GqlAuthGuard } from '@codelab/backend'
import { User } from '@codelab/modules/user'

@Resolver(() => Page)
@Injectable()
export class PageGraphqlAdapter {
  constructor(
    @Inject(PageDITokens.GetPagesUseCase)
    private readonly getPagesService: GetPagesService,
    @Inject(PageDITokens.GetPageUseCase)
    private getPageService: GetPageService,
    @Inject(PageDITokens.CreatePageUseCase)
    private readonly createPageService: CreatePageService,
    @Inject(PageDITokens.DeletePageUseCase)
    private readonly deletePageService: DeletePageService,
  ) {}

  @Mutation(() => Page)
  @UseGuards(GqlAuthGuard)
  async createPage(
    @Args('input') input: CreatePageInput,
    @CurrentUser() user: User,
  ) {
    return await this.createPageService.execute(input)
  }

  @Query(() => [Page])
  @UseGuards(GqlAuthGuard)
  async getPages(
    @Args('input') input: GetPagesInput,
    @CurrentUser() user: User,
  ) {
    return await this.getPagesService.execute(input)
  }

  @Query(() => Page)
  @UseGuards(GqlAuthGuard)
  async getPage(@Args('input') input: GetPageInput) {
    return await this.getPageService.execute(input)
  }

  @Mutation(() => Page)
  async deletePage(@Args('input') input: DeletePageInput) {
    return await this.deletePageService.execute(input)
  }
}
