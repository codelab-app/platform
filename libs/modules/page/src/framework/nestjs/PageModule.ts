import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PubSub } from 'graphql-subscriptions'
import { CreatePageCommandHandler } from '../../core/application/handlers/CreatePageCommandHandler'
import { CreatePageSuccessCommandHandler } from '../../core/application/handlers/CreatePageSuccessCommandHandler'
import { DeletePageCommandHandler } from '../../core/application/handlers/DeletePageCommandHandler'
import { GetPageQueryHandler } from '../../core/application/handlers/GetPageQueryHandler'
import { GetPagesQueryHandler } from '../../core/application/handlers/GetPagesQueryHandler'
import { CreatePageService } from '../../core/application/useCases/createPage/CreatePageService'
import { DeletePageService } from '../../core/application/useCases/deletePage/DeletePageService'
import { GetPageService } from '../../core/application/useCases/getPage/GetPageService'
import { GetPagesService } from '../../core/application/useCases/getPages/GetPagesService'
import { PrismaPageRepositoryAdapter } from '../../infrastructure/persistence/PrismaPageRepositoryAdapter'
import { PageCommandQueryAdapter } from '../../presentation/controllers/PageCommandQueryAdapter'
import { PageDITokens } from '../PageDITokens'
import { PrismaDITokens } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [
  {
    provide: PageDITokens.PageRepository,
    useFactory: (prismaService) =>
      new PrismaPageRepositoryAdapter(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  PageCommandQueryAdapter,
]

const useCaseProviders: Array<Provider> = [
  {
    provide: PageDITokens.DeletePageUseCase,
    useFactory: (pageRepository) => new DeletePageService(pageRepository),
    inject: [PageDITokens.PageRepository],
  },
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
    provide: PageDITokens.GraphQLPubSub,
    useFactory: () => new PubSub(),
  },
  {
    provide: PageDITokens.CreatePageUseCase,
    useFactory: (pageRepository) => new CreatePageService(pageRepository),
    inject: [PageDITokens.PageRepository],
  },
]

export const handlerProviders: Array<Provider> = [
  DeletePageCommandHandler,
  GetPageQueryHandler,
  GetPagesQueryHandler,
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
