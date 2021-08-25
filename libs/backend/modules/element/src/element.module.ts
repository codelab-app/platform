import { Void } from '@codelab/backend/abstract/types'
import { AppModule } from '@codelab/backend/modules/app'
import { AtomModule } from '@codelab/backend/modules/atom'
import { HookModule } from '@codelab/backend/modules/hook'
import { TypeModule } from '@codelab/backend/modules/type'
import { CytoscapeModule, TreeModule } from '@codelab/backend/shared/generic'
import { Module } from '@nestjs/common'
import { ElementAdapter } from './application/element.adapter'
import { ElementResolver } from './application/element.resolver'
import { ElementValidator } from './application/element.validator'
import { ElementTreeAdapter } from './application/element-tree.adapter'
import { ComponentModule } from './component.module'
import { ComponentResolver } from './domain/component/component.resolver'
import { AddHookToElementService } from './use-cases/element/add-hook-to-element'
import { CreateElementService } from './use-cases/element/create-element'
import { DeleteElementService } from './use-cases/element/delete-element'
import { GetElementGraphService } from './use-cases/element/get-element-graph'
import { GetElementParentService } from './use-cases/element/get-element-parent'
import { GetLastOrderChildService } from './use-cases/element/get-last-order-child'
import { MoveElementService } from './use-cases/element/move-element'
import { RemoveHookFromElementService } from './use-cases/element/remove-hook-from-element'
import { UpdateElementService } from './use-cases/element/update-element'
import { UpdateElementPropsService } from './use-cases/element/update-element-props'

const services = [
  /**
   * Use Cases
   */
  CreateElementService,
  GetElementGraphService,
  GetLastOrderChildService,
  DeleteElementService,
  GetElementParentService,
  UpdateElementService,
  MoveElementService,
  UpdateElementPropsService,
  AddHookToElementService,
  RemoveHookFromElementService,
  /**
   * Adapters
   */
  ElementAdapter,
  ElementTreeAdapter,
  /**
   * Validators
   */
  ElementValidator,
]

@Module({
  imports: [
    AppModule,
    AtomModule,
    TypeModule,
    CytoscapeModule,
    TreeModule,
    ComponentModule,
    HookModule,
  ],
  providers: [...services, ElementResolver, ComponentResolver, Void],
  exports: [...services],
})
export class ElementModule {}
