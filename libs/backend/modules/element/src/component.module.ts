import { Module } from '@nestjs/common'
import { CreateComponentService } from './use-cases/component/create-component'
import { GetComponentsService } from './use-cases/component/get-components'

const services = [
  /**
   * Use Cases
   */
  CreateComponentService,
  GetComponentsService,
]

@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class ComponentModule {}
