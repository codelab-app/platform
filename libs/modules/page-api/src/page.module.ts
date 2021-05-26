import { ApolloClientModule, DGraphModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app-api'
import { PageElementModule } from '@codelab/modules/page-element-api'
import { Module } from '@nestjs/common'
import { PageResolver } from './page.resolver'
import {
  CreatePageService,
  GetPageRootService,
  GetPageService,
  GetPagesService,
} from './use-cases'

const services = [
  CreatePageService,
  GetPagesService,
  GetPageRootService,
  GetPageService,
]

@Module({
  imports: [ApolloClientModule, AppModule, PageElementModule, DGraphModule],
  providers: [...services, PageResolver],
  exports: [...services],
})
export class PageModule {}
