import { ApolloClientModule, DGraphModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app-api'
import { PageElementModule } from '@codelab/modules/page-element-api'
import { Module } from '@nestjs/common'
import { PageGuardService } from './auth'
import { PageResolver } from './page.resolver'
import {
  CreatePageService,
  DeletePageService,
  GetPageOwnerService,
  GetPageRootService,
  GetPageService,
  GetPagesService,
  UpdatePageService,
} from './use-cases'

const services = [
  CreatePageService,
  GetPageOwnerService,
  PageGuardService,
  GetPagesService,
  GetPageRootService,
  GetPageService,
  UpdatePageService,
  DeletePageService,
]

@Module({
  imports: [ApolloClientModule, AppModule, PageElementModule, DGraphModule],
  providers: [...services, PageResolver],
  exports: [...services],
})
export class PageModule {}
