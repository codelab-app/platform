import { Module } from '@nestjs/common'
import { GraphModule } from '../../../../graph/src/framework/nestjs/GraphModule'
import { CreatePageService } from '../../core/application/useCases/createPage/CreatePageService'
import { DeletePageService } from '../../core/application/useCases/deletePage/DeletePageService'
import { GetPageService } from '../../core/application/useCases/getPage/GetPageService'
import { GetPagesService } from '../../core/application/useCases/getPages/GetPagesService'
import { UpdatePageService } from '../../core/application/useCases/updatePage/UpdatePageService'
import { PageResolvers } from '../../presentation/controllers/PageResolvers'

@Module({
  imports: [GraphModule],
  providers: [
    /**
     * Controllers
     */
    PageResolvers,
    /**
     * UseCaseProviders
     */
    CreatePageService,
    UpdatePageService,
    DeletePageService,
    GetPageService,
    GetPagesService,
  ],
  exports: [CreatePageService],
})
export class PageModule {}
