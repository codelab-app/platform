import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store'
import { Module, Provider } from '@nestjs/common'
import { CqrsModule, EventPublisher, QueryBus } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { CreatePageCommandHandler } from '../../core/application/handlers/CreatePageCommandHandler'
import { CreatePageSuccessCommandHandler } from '../../core/application/handlers/CreatePageSuccessCommandHandler'
import { PageCreateErrorEventHandler } from '../../core/application/sagas/PageCreateErrorEventHandler'
import { PageCreateSuccessSaga } from '../../core/application/sagas/PageCreateSuccess.saga'
import { AssignGraphToPageSuccessEvent } from '../../core/application/useCases/createPage/AssignGraphToPageSuccessEvent'
import { AssignPageToAppSuccessEvent } from '../../core/application/useCases/createPage/AssignPageToAppSuccessEvent'
import { CreatePageService } from '../../core/application/useCases/createPage/CreatePageService'
import { PageCreateErrorEvent } from '../../core/application/useCases/createPage/PageCreateErrorEvent'
import { PageCreatedEvent } from '../../core/application/useCases/createPage/PageCreatedEvent'
import { TypeOrmPageRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmPageRepositoryAdapter'
import { PageCommandQueryAdapter } from '../../presentation/controllers/PageCommandQueryAdapter'
import { PageDITokens } from '../PageDITokens'

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
    provide: PageDITokens.CreatePageUseCase,
    useFactory: (pageRepository, eventPublisher, queryBus) =>
      new CreatePageService(pageRepository, eventPublisher, queryBus),
    inject: [PageDITokens.PageRepository, EventPublisher, QueryBus],
  },
]

export const handlerProviders: Array<Provider> = [
  PageCreateErrorEventHandler,
  CreatePageCommandHandler,
  CreatePageSuccessCommandHandler,
]

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$svc-page',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: '$svc-graph',
          persistentSubscriptionName: 'graph',
        },
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: '$svc-app',
          persistentSubscriptionName: 'app',
        },
      ],
      eventHandlers: {
        AssignGraphToPageSuccessEvent: () =>
          new AssignGraphToPageSuccessEvent(),
        AssignPageToAppSuccessEvent: () => new AssignPageToAppSuccessEvent(),
        PageCreatedEvent: (app, page) => new PageCreatedEvent(app, page),
        PageCreateErrorEvent: (page, graph) =>
          new PageCreateErrorEvent(page, graph),
      },
    }),
  ],
  providers: [
    PageCreateSuccessSaga,
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class PageModule {}
