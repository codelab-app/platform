import { Inject, Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { CreatePageCommand } from '../../core/application/commands/CreatePageCommand'
import { PageDto } from '../../core/application/useCases/PageDto'
import { CreatePageInput } from '../../core/application/useCases/createPage/CreatePageInput'
import { PageDITokens } from '../../framework/PageDITokens'
import {
  CommandQueryBusPort,
  TypeOrmPage,
  UseCaseRequestPort,
} from '@codelab/backend'

@Resolver(() => TypeOrmPage)
@Injectable()
export class PageCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
    @Inject(PageDITokens.GraphQLPubSub)
    public readonly pubSub: PubSub,
  ) {}

  @Mutation(() => String)
  async createPage(@Args('input') input: CreatePageInput) {
    await this.commandBus.execute(new CreatePageCommand(input))

    return ''
  }

  @Subscription(() => PageDto)
  async pageCreated() {
    return this.pubSub.asyncIterator<PageDto>('pageCreated')
  }
}
