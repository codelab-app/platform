import { Module, Provider } from '@nestjs/common'
import { CqrsModule, EventPublisher, QueryBus } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { CreatePageCommandHandler } from '../../core/application/handlers/CreatePageCommandHandler'
import { GetPageQueryHandler } from '../../core/application/handlers/GetPageQueryHandler'
import { GetPagesQueryHandler } from '../../core/application/handlers/GetPagesQueryHandler'
import { CreatePageService } from '../../core/application/useCases/createPage/CreatePageService'
import { GetPageService } from '../../core/application/useCases/getPage/GetPageService'
import { GetPagesService } from '../../core/application/useCases/getPages/GetPagesService'
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
    provide: PageDITokens.GetPageUseCase,
    useFactory: (pageRepository) => new GetPageService(pageRepository),
    inject: [PageDITokens.PageRepository],
  },
  {
    provide: PageDITokens.GetPagesUseCase,
    useFactory: (pageRepository) => new GetPagesService(pageRepository),
    inject: [PageDITokens.PageRepository],
  },
  {
    provide: PageDITokens.CreatePageUseCase,
    useFactory: (pageRepository, eventPublisher, queryBus) =>
      new CreatePageService(pageRepository, eventPublisher, queryBus),
    inject: [PageDITokens.PageRepository, EventPublisher, QueryBus],
  },
]

export const handlerProviders: Array<Provider> = [
  GetPageQueryHandler,
  GetPagesQueryHandler,
  CreatePageCommandHandler,
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
