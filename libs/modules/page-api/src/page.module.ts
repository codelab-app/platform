import { CytoscapeModule, Void } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app-api'
import { ElementModule } from '@codelab/modules/element-api'
import { Module } from '@nestjs/common'
import { AppPagesResolver } from './app-pages.resolver'
import { PageMapper } from './page.mapper'
import { PageResolver } from './page.resolver'
import { PageValidator } from './page.validator'
import {
  CreatePageService,
  DeletePageService,
  GetPageService,
  GetPagesService,
  UpdatePageService,
} from './use-cases'

const services = [
  CreatePageService,
  PageValidator,
  GetPagesService,
  GetPageService,
  UpdatePageService,
  DeletePageService,
  PageMapper,
]

@Module({
  imports: [AppModule, ElementModule, CytoscapeModule],
  providers: [PageResolver, AppPagesResolver, ...services, Void],
  exports: [...services],
})
export class PageModule {}
