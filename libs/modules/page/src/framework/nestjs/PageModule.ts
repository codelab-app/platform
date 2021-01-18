import { Module, Provider } from '@nestjs/common'
import { CqrsModule, EventPublisher, QueryBus } from '@nestjs/cqrs'
import { PubSub } from 'graphql-subscriptions'
import { Connection } from 'typeorm'
import { CreatePageCommandHandler } from '../../core/application/handlers/CreatePageCommandHandler'
import { CreatePageSuccessCommandHandler } from '../../core/application/handlers/CreatePageSuccessCommandHandler'
import { AssignGraphToPageSuccessEventHandler } from '../../core/application/sagas/AssignGraphToPageSuccessEventHandler'
import { AssignPageToAppSuccessEventHandler } from '../../core/application/sagas/AssignPageToAppSuccessEventHandler'
import { PageCreateErrorEventHandler } from '../../core/application/sagas/PageCreateErrorEventHandler'
import { CreatePageService } from '../../core/application/useCases/createPage/CreatePageService'
import { TypeOrmPageRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmPageRepositoryAdapter'
import { PageCommandQueryAdapter } from '../../presentation/controllers/PageCommandQueryAdapter'
import { PageDITokens } from '../PageDITokens'
import { CodelabEventsService } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [
  {
    provide: PageDITokens.PageRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmPageRepositoryAdapter),
    inject: [Connection],
  },
  PageCommandQueryAdapter,
]

const useCaseProviders: Array<Provider> = [
  {
    provide: PageDITokens.GraphQLPubSub,
    useFactory: () => new PubSub(),
  },
  {
    provide: PageDITokens.CodelabEventsService,
    useFactory: () => new CodelabEventsService(),
  },
  {
    provide: PageDITokens.CreatePageUseCase,
    useFactory: (pageRepository, eventPublisher, queryBus) =>
      new CreatePageService(pageRepository, eventPublisher, queryBus),
    inject: [PageDITokens.PageRepository, EventPublisher, QueryBus],
  },
]

export const handlerProviders: Array<Provider> = [
  AssignGraphToPageSuccessEventHandler,
  AssignPageToAppSuccessEventHandler,
  PageCreateErrorEventHandler,
  CreatePageCommandHandler,
  CreatePageSuccessCommandHandler,
]

@Module({
  imports: [
    CqrsModule,
    // EventStoreModule.registerFeature({
    // CodelabEventStoreModule.registerFeature({
    //   type: 'event-store',
    //   featureStreamName: '$svc-page',
    //   subscriptions: [
    //     {
    //       type: EventStoreSubscriptionType.Persistent,
    //       stream: '$svc-graph',
    //       persistentSubscriptionName: 'graph',
    //     },
    //     {
    //       type: EventStoreSubscriptionType.Persistent,
    //       stream: '$svc-app',
    //       persistentSubscriptionName: 'app',
    //     },
    //   ],
    //   eventHandlers: {
    //     AssignGraphToPageSuccessEvent: () =>
    //       new AssignGraphToPageSuccessEvent(),
    //     AssignPageToAppSuccessEvent: () => new AssignPageToAppSuccessEvent(),
    //     PageCreatedEvent: (app, page) => new PageCreatedEvent(app, page),
    //     PageCreateErrorEvent: (page, graph) =>
    //       new PageCreateErrorEvent(page, graph),
    //   },
    // }),
  ],
  providers: [
    // PageCreateSuccessSaga,
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class PageModule {}
