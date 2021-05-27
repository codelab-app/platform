import { ApolloClientModule, DGraphModule } from '@codelab/backend'
import { AtomModule } from '@codelab/modules/atom-api'
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
  MovePageElementService,
  UpdatePageElementService,
} from './use-cases'

const services = [
  GetPageElementRootService,
  CreatePageElementService,
  GetPageElementService,
  GetLastOrderChildService,
  FlattenPageElementTreeService,
  DeletePageElementService,
  GetPageElementParentService,
  UpdatePageElementService,
  MovePageElementService,
]

@Module({
  imports: [DGraphModule, ApolloClientModule, AtomModule],
  providers: [...services, PageElementResolver],
  exports: [...services],
})
export class PageElementModule {}
