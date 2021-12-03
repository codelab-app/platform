import { Void } from '@codelab/backend/abstract/types'
import { AtomModule } from '@codelab/backend/modules/atom'
import { HookModule } from '@codelab/backend/modules/hook'
import { PropModule } from '@codelab/backend/modules/prop'
import { TypeModule } from '@codelab/backend/modules/type'
import { CytoscapeModule, TreeModule } from '@codelab/backend/shared/generic'
import { Module } from '@nestjs/common'
import { ComponentResolver } from './application/component.resolver'
import { ElementResolver } from './application/element.resolver'
import { ElementValidator } from './application/element.validator'
import { HookResolver } from './application/hook.resolver'
import { PropMapBindingResolver } from './application/prop-map.binding.resolver'
import { ComponentModule } from './component.module'
import { PropMapBindingAdapter } from './domain/prop-mapping/prop-map-binding.adapter'
import { CreateElementService } from './use-cases/element/create-element'
import { DeleteElementService } from './use-cases/element/delete-element'
import { GetElementGraphService } from './use-cases/element/get-element-graph'
import { GetElementParentService } from './use-cases/element/get-element-parent'
import { GetLastOrderChildService } from './use-cases/element/get-last-order-child'
import { AddHookToElementService } from './use-cases/element/hooks/add-hook-to-element'
import { RemoveHookFromElementService } from './use-cases/element/hooks/remove-hook-from-element'
import { MoveElementService } from './use-cases/element/move-element'
import { CreatePropMapBindingService } from './use-cases/element/prop-mapping/create-prop-map-binding'
import { DeletePropMapBindingService } from './use-cases/element/prop-mapping/delete-prop-map-binding'
import { UpdatePropMapBindingService } from './use-cases/element/prop-mapping/update-prop-map-binding'
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

  /**
   * Validators
   */
  ElementValidator,

  /**
   * Prop Map Bindings
   */
  CreatePropMapBindingService,
  UpdatePropMapBindingService,
  DeletePropMapBindingService,
  PropMapBindingAdapter,
  PropMapBindingResolver,

  /**
   * Hooks
   */
  AddHookToElementService,
  RemoveHookFromElementService,
  HookResolver,
]

@Module({
  imports: [
    AtomModule,
    TypeModule,
    CytoscapeModule,
    TreeModule,
    ComponentModule,
    HookModule,
    PropModule,
  ],
  providers: [...services, ElementResolver, ComponentResolver, Void],
  exports: [...services],
})
export class ElementModule {}
