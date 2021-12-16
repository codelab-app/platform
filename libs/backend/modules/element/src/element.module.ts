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
import { PropMapBindingAdapter } from './domain/prop-mapping/prop-map-binding.adapter'
import { ElementInfrastructureModule } from './infrastructure/modules/element-infrastructure.module'
import { CreateComponentService } from './use-cases/component/create-component/create-component.service'
import { GetComponentsService } from './use-cases/component/get-components'
import { ConvertElementToComponentService } from './use-cases/element/convert-element-to-component'
import { CreateElementService } from './use-cases/element/create-element'
import { DeleteElementService } from './use-cases/element/delete-element'
import { DuplicateElementService } from './use-cases/element/duplicate-element'
import { GetElementService } from './use-cases/element/get-element/get-element.service'
import { GetElementGraphService } from './use-cases/element/get-element-graph'
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
  CreateComponentService,
  GetComponentsService,
  GetElementService,
  GetElementGraphService,
  DeleteElementService,
  DuplicateElementService,
  UpdateElementService,
  MoveElementService,
  UpdateElementPropsService,
  ConvertElementToComponentService,
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

  /**
   * Validators
   */
  ElementValidator,
]

@Module({
  imports: [
    AtomModule,
    TypeModule,
    CytoscapeModule,
    TreeModule,
    HookModule,
    PropModule,
  ],
  providers: [...services, ElementResolver, ComponentResolver, Void],
  exports: [...services],
})
export class ElementCoreModule {}

@Module({
  imports: [ElementCoreModule, ElementInfrastructureModule],
  providers: [],
  exports: [ElementCoreModule, ElementInfrastructureModule],
})
export class ElementModule {}
