import { AppModule } from '@codelab/modules/app-api'
import { AtomModule } from '@codelab/modules/atom-api'
import { PropModule } from '@codelab/modules/prop-api'
import { Module } from '@nestjs/common'
import { PageElementGuardService } from './auth'
import { PageElementResolver } from './page-element.resolver'
import {
  CreatePageElementService,
  DeletePageElementService,
  FlattenPageElementTreeService,
  GetLastOrderChildService,
  GetPageElementOwnerService,
  GetPageElementParentService,
  GetPageElementRootService,
  GetPageElementService,
  MovePageElementService,
  UpdatePageElementService,
} from './use-cases'

const services = [
  PageElementGuardService,
  GetPageElementRootService,
  CreatePageElementService,
  GetPageElementService,
  GetLastOrderChildService,
  FlattenPageElementTreeService,
  DeletePageElementService,
  GetPageElementParentService,
  UpdatePageElementService,
  MovePageElementService,
  GetPageElementOwnerService,
]

@Module({
  imports: [AppModule, AtomModule, PropModule],
  providers: [...services, PageElementResolver],
  exports: [...services],
})
export class PageElementModule {}
