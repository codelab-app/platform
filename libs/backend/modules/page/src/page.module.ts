import { CytoscapeModule, Void } from '@codelab/backend/infra'
import { AppModule } from '@codelab/backend/modules/app'
import { ElementModule } from '@codelab/backend/modules/element'
import { Module } from '@nestjs/common'
import { AppPagesResolver } from './app-pages.resolver'
import { PageAdapter } from './page.adapter'
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
  PageAdapter,
]

@Module({
  imports: [AppModule, ElementModule, CytoscapeModule],
  providers: [PageResolver, AppPagesResolver, ...services, Void],
  exports: [...services],
})
export class PageModule {}
