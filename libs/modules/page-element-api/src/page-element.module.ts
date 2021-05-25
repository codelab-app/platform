import { ApolloClientModule, DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { PageElementResolver } from './page-element.resolver'
import {
  CreatePageElementService,
  GetLastOrderChildService,
  GetPageElementRootService,
  GetPageElementService,
} from './use-cases'

const services = [
  GetPageElementRootService,
  CreatePageElementService,
  GetPageElementService,
  GetLastOrderChildService,
]

@Module({
  imports: [DGraphModule, ApolloClientModule],
  providers: [...services, PageElementResolver],
  exports: [...services],
})
export class PageElementModule {}
