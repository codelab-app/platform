import { Module } from '@nestjs/common'
import { GetComponentsService } from './use-cases/component/get-components'

const services = [
  /**
   * Use Cases
   */
  GetComponentsService,
]

@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class ComponentModule {}
