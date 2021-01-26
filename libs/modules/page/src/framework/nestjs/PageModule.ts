import { Module, Provider } from '@nestjs/common'
import { CreatePageService } from '../../core/application/useCases/createPage/CreatePageService'
import { DeletePageService } from '../../core/application/useCases/deletePage/DeletePageService'
import { GetPageService } from '../../core/application/useCases/getPage/GetPageService'
import { GetPagesService } from '../../core/application/useCases/getPages/GetPagesService'
import { PageDITokens } from '../PageDITokens'
import { PrismaDITokens } from '@codelab/backend'

const useCaseProviders: Array<Provider> = [
  {
    provide: PageDITokens.DeletePageUseCase,
    useFactory: (prismaService) => new DeletePageService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: PageDITokens.GetPageUseCase,
    useFactory: (prismaService) => new GetPageService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: PageDITokens.GetPagesUseCase,
    useFactory: (prismaService) => new GetPagesService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: PageDITokens.CreatePageUseCase,
    useFactory: (prismaService) => new CreatePageService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
]

@Module({
  providers: [...useCaseProviders],
})
export class PageModule {}
