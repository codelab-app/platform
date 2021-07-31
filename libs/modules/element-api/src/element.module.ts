import { CytoscapeModule, TreeModule, Void } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app-api'
import { AtomModule } from '@codelab/modules/atom-api'
import { Module } from '@nestjs/common'
import { ElementMapper } from './element.mapper'
import { ElementResolver } from './element.resolver'
import { ElementValidator } from './element.validator'
import { ElementTreeTransformer } from './element-tree.transformer'
import {
  CreateElementService,
  DeleteElementService,
  GetElementParentService,
  GetElementService,
  GetLastOrderChildService,
  MoveElementService,
  UpdateElementPropsService,
  UpdateElementService,
} from './use-cases'

const services = [
  ElementValidator,
  CreateElementService,
  GetElementService,
  GetLastOrderChildService,
  DeleteElementService,
  GetElementParentService,
  UpdateElementService,
  MoveElementService,
  ElementTreeTransformer,
  ElementMapper,
  UpdateElementPropsService,
]

@Module({
  imports: [AppModule, AtomModule, CytoscapeModule, TreeModule],
  providers: [...services, ElementResolver, Void],
  exports: [...services],
})
export class ElementModule {}
