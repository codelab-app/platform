import { Module } from '@nestjs/common'
import { GraphModule } from '../../../../graph/src/framework/nestjs/GraphModule'
import { CreatePageService } from '../../core/application/useCases/createPage/CreatePageService'
import { DeletePageService } from '../../core/application/useCases/deletePage/DeletePageService'
import { GetPageService } from '../../core/application/useCases/getPage/GetPageService'
import { GetPagesService } from '../../core/application/useCases/getPages/GetPagesService'
import { PageResolvers } from '../../presentation/controllers/PageResolvers'
import { PrismaService } from '@codelab/backend'

@Module({
  imports: [GraphModule],
  providers: [
    PrismaService,
    /**
     * Controllers
     */
    PageResolvers,
    /**
     * UseCaseProviders
     */
    DeletePageService,
    GetPageService,
    GetPagesService,
    CreatePageService,
  ],
})
export class PageModule {}
