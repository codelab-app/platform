import { Module, Provider } from '@nestjs/common'
import { CqrsModule, EventPublisher, QueryBus } from '@nestjs/cqrs'
import { PubSub } from 'graphql-subscriptions'
import { Connection } from 'typeorm'
import { CreatePageCommandHandler } from '../../core/application/handlers/CreatePageCommandHandler'
import { CreatePageSuccessCommandHandler } from '../../core/application/handlers/CreatePageSuccessCommandHandler'
import { PageCreateErrorEventHandler } from '../../core/application/sagas/PageCreateErrorEventHandler'
import { PageSaga } from '../../core/application/sagas/PageSaga'
import { CreatePageService } from '../../core/application/useCases/createPage/CreatePageService'
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
    provide: PageDITokens.GraphQLPubSub,
    useFactory: () => new PubSub(),
  },
  {
    provide: PageDITokens.CreatePageUseCase,
    useFactory: (pageRepository, eventPublisher, queryBus) =>
      new CreatePageService(pageRepository, eventPublisher, queryBus),
    inject: [PageDITokens.PageRepository, EventPublisher, QueryBus],
  },
]

export const handlerProviders: Array<Provider> = [
  PageSaga,
  PageCreateErrorEventHandler,
  CreatePageCommandHandler,
  CreatePageSuccessCommandHandler,
]

@Module({
  imports: [CqrsModule],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class PageModule {}
