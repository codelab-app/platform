import { CytoscapeModule, TreeModule, Void } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app-api'
import { AtomModule } from '@codelab/modules/atom-api'
import { Module } from '@nestjs/common'
import {
  ComponentMapper,
  ComponentValidator,
  CreateComponentService,
  DeleteComponentService,
  GetComponentService,
  GetComponentsService,
  UpdateComponentService,
} from './component'
import { ComponentResolver } from './component/component.resolver'
import { ElementMapper } from './element.mapper'
import { ElementResolver } from './element.resolver'
import { ElementValidator } from './element.validator'
import { ElementTreeTransformer } from './element-tree.transformer'
import {
  CreateElementService,
  DeleteElementService,
  GetElementGraphService,
  GetElementParentService,
  GetLastOrderChildService,
  MoveElementService,
  UpdateElementPropsService,
  UpdateElementService,
} from './use-cases'

const services = [
  //
  // Element
  ElementValidator,
  CreateElementService,
  GetElementGraphService,
  GetLastOrderChildService,
  DeleteElementService,
  GetElementParentService,
  UpdateElementService,
  MoveElementService,
  ElementTreeTransformer,
  ElementMapper,
  UpdateElementPropsService,
  //
  // Component
  ComponentValidator,
  ComponentMapper,
  CreateComponentService,
  DeleteComponentService,
  GetComponentService,
  GetComponentsService,
  UpdateComponentService,
]

@Module({
  imports: [AppModule, AtomModule, CytoscapeModule, TreeModule],
  providers: [...services, ElementResolver, ComponentResolver, Void],
  exports: [...services],
})
export class ElementModule {}
