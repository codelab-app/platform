import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store'
import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { AssignGraphToPageSuccessEvent } from '../../../../page/src/core/application/useCases/createPage/AssignGraphToPageSuccessEvent'
import { AssignPageToAppSuccessEvent } from '../../../../page/src/core/application/useCases/createPage/AssignPageToAppSuccessEvent'
import { PageCreateErrorEvent } from '../../../../page/src/core/application/useCases/createPage/PageCreateErrorEvent'
import { PageCreatedEvent } from '../../../../page/src/core/application/useCases/createPage/PageCreatedEvent'
import { AssignPageToAppCommandHandler } from '../../core/application/handlers/AssignPageToAppCommandHandler'
import { CreateAppCommandHandler } from '../../core/application/handlers/CreateAppCommandHandler'
import { DeleteAppCommandHandler } from '../../core/application/handlers/DeleteAppCommandHandler'
import { GetAppQueryHandler } from '../../core/application/handlers/GetAppQueryHandler'
import { GetAppsQueryHandler } from '../../core/application/handlers/GetAppsQueryHandler'
import { AppPageSaga } from '../../core/application/sagas/AppPage.saga'
import { CreateAppService } from '../../core/application/useCases/createApp/CreateAppService'
import { DeleteAppService } from '../../core/application/useCases/deleteApp/DeleteAppService'
import { GetAppService } from '../../core/application/useCases/getApp/GetAppService'
import { GetAppsService } from '../../core/application/useCases/getApps/GetAppsService'
import { TypeOrmAppRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmAppRepositoryAdapter'
import { AppCommandQueryAdapter } from '../../presentation/controllers/AppCommandQueryAdapter'
import { AppDITokens } from '../AppDITokens'

export const persistenceProviders: Array<Provider> = [
  {
    provide: AppDITokens.AppRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmAppRepositoryAdapter),
    inject: [Connection],
  },
  AppCommandQueryAdapter,
]

export const useCaseProviders: Array<Provider> = [
  {
    provide: AppDITokens.GetAppUseCase,
    useFactory: (appRepository) => new GetAppService(appRepository),
    inject: [AppDITokens.AppRepository],
  },
  {
    provide: AppDITokens.GetAppsUseCase,
    useFactory: (appRepository) => new GetAppsService(appRepository),
    inject: [AppDITokens.AppRepository],
  },
  {
    provide: AppDITokens.DeleteAppUseCase,
    useFactory: (appRepository) => new DeleteAppService(appRepository),
    inject: [AppDITokens.AppRepository],
  },
  {
    provide: AppDITokens.CreateAppUseCase,
    useFactory: (appRepository) => new CreateAppService(appRepository),
    inject: [AppDITokens.AppRepository],
  },
]

export const handlerProviders: Array<Provider> = [
  AssignPageToAppCommandHandler,
  GetAppQueryHandler,
  GetAppsQueryHandler,
  GetAppQueryHandler,
  CreateAppCommandHandler,
  DeleteAppCommandHandler,
]

export const sagas: Array<Provider> = [AppPageSaga]

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$svc-app',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: '$svc-page',
          persistentSubscriptionName: 'page',
        },
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: '$svc-graph',
          persistentSubscriptionName: 'graph',
        },
      ],
      eventHandlers: {
        AssignPageToAppSuccessEvent: () => new AssignPageToAppSuccessEvent(),
        AssignGraphToPageSuccessEvent: () =>
          new AssignGraphToPageSuccessEvent(),
        PageCreatedEvent: (app, page) => new PageCreatedEvent(app, page),
        PageCreateErrorEvent: (page) => new PageCreateErrorEvent(page),
      },
    }),
  ],
  providers: [
    ...sagas,
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class AppModule {}
