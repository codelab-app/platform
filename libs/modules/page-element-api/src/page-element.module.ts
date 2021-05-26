import { ApolloClientModule, DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { PageElementResolver } from './page-element.resolver'
import {
  CreatePageElementService,
  DeletePageElementService,
  FlattenPageElementTreeService,
  GetLastOrderChildService,
  GetPageElementParentService,
  GetPageElementRootService,
  GetPageElementService,
  ValidatePageElementService,
} from './use-cases'

const services = [
  GetPageElementRootService,
  CreatePageElementService,
  GetPageElementService,
  GetLastOrderChildService,
  FlattenPageElementTreeService,
  DeletePageElementService,
  ValidatePageElementService,
  GetPageElementParentService,
]

@Module({
  imports: [DGraphModule, ApolloClientModule],
  providers: [...services, PageElementResolver],
  exports: [...services],
})
export class PageElementModule {}
