import { CytoscapeModule, TreeModule, Void } from '@codelab/backend/infra'
import { AppModule } from '@codelab/backend/modules/app'
import { AtomModule } from '@codelab/backend/modules/atom'
import { TypeModule } from '@codelab/backend/modules/type'
import { Module } from '@nestjs/common'
import {
  ComponentAdapter,
  ComponentValidator,
  CreateComponentService,
  DeleteComponentService,
  GetComponentService,
  GetComponentsService,
  UpdateComponentService,
} from './component'
import { ComponentResolver } from './component/component.resolver'
import { ElementAdapter } from './element.adapter'
import { ElementResolver } from './element.resolver'
import { ElementValidator } from './element.validator'
import { ElementTreeAdapter } from './element-tree.adapter'
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
  ElementTreeAdapter,
  ElementAdapter,
  UpdateElementPropsService,
  //
  // Component
  ComponentValidator,
  ComponentAdapter,
  CreateComponentService,
  DeleteComponentService,
  GetComponentService,
  GetComponentsService,
  UpdateComponentService,
]

@Module({
  imports: [AppModule, AtomModule, TypeModule, CytoscapeModule, TreeModule],
  providers: [...services, ElementResolver, ComponentResolver, Void],
  exports: [...services],
})
export class ElementModule {}
