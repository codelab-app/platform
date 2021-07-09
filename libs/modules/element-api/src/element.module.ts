import { AppModule } from '@codelab/modules/app-api'
import { AtomModule } from '@codelab/modules/atom-api'
import { PropModule } from '@codelab/modules/prop-api'
import { Module } from '@nestjs/common'
import { ElementGuardService } from './auth'
import { ElementResolver } from './element.resolver'
import {
  CreateElementService,
  DeleteElementService,
  FlattenElementTreeService,
  GetDgraphElementAggregateService,
  GetElementAggregateService,
  GetElementOwnerService,
  GetElementParentService,
  GetElementService,
  GetLastOrderChildService,
  MoveElementService,
  UpdateElementService,
} from './use-cases'

const services = [
  ElementGuardService,
  GetElementAggregateService,
  GetDgraphElementAggregateService,
  CreateElementService,
  GetElementService,
  GetLastOrderChildService,
  FlattenElementTreeService,
  DeleteElementService,
  GetElementParentService,
  UpdateElementService,
  MoveElementService,
  GetElementOwnerService,
]

@Module({
  imports: [AppModule, AtomModule, PropModule],
  providers: [...services, ElementResolver],
  exports: [...services],
})
export class ElementModule {}
