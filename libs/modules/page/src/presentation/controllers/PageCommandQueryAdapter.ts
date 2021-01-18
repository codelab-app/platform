import { Inject, Injectable, Logger } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { CreatePageCommand } from '../../core/application/commands/CreatePageCommand'
import { PageDto } from '../../core/application/useCases/PageDto'
import { AssignGraphToPageSuccessEvent } from '../../core/application/useCases/createPage/AssignGraphToPageSuccessEvent'
import { AssignPageToAppSuccessEvent } from '../../core/application/useCases/createPage/AssignPageToAppSuccessEvent'
import { CreatePageInput } from '../../core/application/useCases/createPage/CreatePageInput'
import { Page } from '../../core/domain/page'
import { PageDITokens } from '../../framework/PageDITokens'
import {
  CodelabEventsService,
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
    @Inject(PageDITokens.CodelabEventsService)
    public readonly eventService: CodelabEventsService, // @Inject(ProvidersConstants.EVENT_STORE_PROVIDER) // public readonly eventStoreBroker: EventStoreBroker
  ) {}

  logger: Logger = new Logger('PageCommandQueryAdapter')

  @Mutation(() => PageDto)
  async createPage(@Args('input') input: CreatePageInput) {
    const page: Page = await this.commandBus.execute(
      new CreatePageCommand(input),
    )
    const plainPage = page.toPlain()

    return plainPage
  }

  @Query(() => String)
  async readEventTest() {
    // const client: EventStoreNodeConnection = this.eventStoreBroker.getClient()
    // try {
    //   const res: StreamEventsSlice = await client.readStreamEventsBackward('$svc-app', -1, 2)
    //   const readEvent = await client.readEvent('$svc-app', 192)
    //   const a = ''
    // } catch (e) {
    //   this.logger.error(e)
    // }
    return ''
  }

  @Subscription(() => PageDto)
  async pageCreated() {
    this.eventService.getBothPageEvents().subscribe((res) => {
      const a: AssignGraphToPageSuccessEvent = res[0]
      const b: AssignPageToAppSuccessEvent = res[1]

      if (a && b) {
        this.pubSub.publish('pageCreated', { pageCreated: a.page })
      }
    })

    return this.pubSub.asyncIterator<PageDto>('pageCreated')
  }
}
