import { Module } from '@nestjs/common'
import { ComponentAdapter } from './domain/component/component.adapter'
import { ComponentValidator } from './domain/component/component.validator'
import { CreateComponentService } from './use-cases/component/create-component/create-component.service'
import { DeleteComponentService } from './use-cases/component/delete-component/delete-component.service'
import { GetComponentService } from './use-cases/component/get-component/get-component.service'
import { GetComponentsService } from './use-cases/component/get-components/get-components.service'
import { UpdateComponentService } from './use-cases/component/update-component/update-component.service'

const services = [
  /**
   * Use Cases
   */
  CreateComponentService,
  DeleteComponentService,
  GetComponentService,
  GetComponentsService,
  UpdateComponentService,
  /**
   * Adapters
   */
  ComponentAdapter,
  /**
   * Validators
   */
  ComponentValidator,
]

@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class ComponentModule {}
