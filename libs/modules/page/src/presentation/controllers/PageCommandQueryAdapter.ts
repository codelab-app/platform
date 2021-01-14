import { Injectable, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { classToPlain } from 'class-transformer'
import { CreatePageCommand } from '../../core/application/commands/CreatePageCommand'
import { GetPageQuery } from '../../core/application/queries/GetPageQuery'
import { GetPagesQuery } from '../../core/application/queries/GetPagesQuery'
import { CreatePageInput } from '../../core/application/useCases/createPage/CreatePageInput'
import { GetPageInput } from '../../core/application/useCases/getPage/GetPageInput'
import { GetPagesInput } from '../../core/application/useCases/getPages/GetPagesInput'
import { Page } from '../../core/domain/page'
import { PageDto } from '../PageDto'
import {
  CommandQueryBusPort,
  CurrentUser,
  GqlAuthGuard,
  TypeOrmPage,
  UseCaseRequestPort,
} from '@codelab/backend'
import { User } from '@codelab/modules/user'

@Resolver(() => TypeOrmPage)
@Injectable()
export class PageCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  @Mutation(() => PageDto)
  @UseGuards(GqlAuthGuard)
  async createPage(
    @Args('input') input: CreatePageInput,
    @CurrentUser() user: User,
  ) {
    const page: Page = await this.commandBus.execute(
      new CreatePageCommand({ ...input, user }),
    )

    return page.toPlain()
  }

  @Query(() => [PageDto])
  @UseGuards(GqlAuthGuard)
  async getPages(
    @Args('input') { appId }: GetPagesInput,
    @CurrentUser() user: User,
  ) {
    const results = await this.queryBus.execute<GetPagesQuery, Array<Page>>(
      new GetPagesQuery({
        userId: user.id.toString(),
        appId,
      }),
    )

    return classToPlain(results)
  }

  @Query(() => PageDto)
  async getPage(@Args('input') input: GetPageInput) {
    const result = await this.queryBus.execute(new GetPageQuery(input))

    return result.toPlain()
  }
}
