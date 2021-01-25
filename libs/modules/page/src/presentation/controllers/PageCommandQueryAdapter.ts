import { Inject, Injectable, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { CreatePageCommand } from '../../core/application/commands/CreatePageCommand'
import { DeletePageCommand } from '../../core/application/commands/DeletePageCommand'
import { GetPageQuery } from '../../core/application/queries/GetPageQuery'
import { GetPagesQuery } from '../../core/application/queries/GetPagesQuery'
import { CreatePageInput } from '../../core/application/useCases/createPage/CreatePageInput'
import { DeletePageInput } from '../../core/application/useCases/deletePage/DeletePageInput'
import { GetPageInput } from '../../core/application/useCases/getPage/GetPageInput'
import { GetPagesInput } from '../../core/application/useCases/getPages/GetPagesInput'
import { Page } from '../../core/domain/page'
import { PageEntity } from '../../core/domain/page.codec'
import { PageDITokens } from '../../framework/PageDITokens'
import { PageDto } from '../PageDto'
import {
  CommandQueryBusPort,
  CurrentUser,
  GqlAuthGuard,
  UseCaseRequestPort,
} from '@codelab/backend'
import { User } from '@codelab/modules/user'

@Resolver(() => Page)
@Injectable()
export class PageCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
    @Inject(PageDITokens.GraphQLPubSub)
    public readonly pubSub: PubSub,
  ) {}

  @Mutation(() => PageDto)
  @UseGuards(GqlAuthGuard)
  async createPage(
    @Args('input') input: CreatePageInput,
    @CurrentUser() user: User,
  ) {
    const result = await this.commandBus.execute(
      new CreatePageCommand({ ...input, user }),
    )

    return result
  }

  @Subscription(() => PageDto)
  async pageCreated() {
    return this.pubSub.asyncIterator<PageDto>('pageCreated')
  }

  @Query(() => [PageDto])
  @UseGuards(GqlAuthGuard)
  async getPages(
    @Args('input') { appId }: GetPagesInput,
    @CurrentUser() user: User,
  ) {
    const pages = await this.queryBus.execute<GetPagesQuery, Array<Page>>(
      new GetPagesQuery({
        userId: user.id.toString(),
        appId,
      }),
    )

    return pages.map((page) => PageEntity.encode(page))
  }

  @Query(() => PageDto)
  @UseGuards(GqlAuthGuard)
  async getPage(@Args('input') input: GetPageInput) {
    const page = await this.queryBus.execute(new GetPageQuery(input))

    return PageEntity.encode(page)
  }

  @Mutation(() => PageDto)
  async deletePage(@Args('input') input: DeletePageInput) {
    const page = await this.commandBus.execute(new DeletePageCommand(input))

    return PageEntity.encode(page)
  }
}
