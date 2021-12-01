import { PropModule } from '@codelab/backend/modules/prop'
import { Module } from '@nestjs/common'
import { GetComponentsService } from './use-cases/component/get-components'

const services = [
  /**
   * Use Cases
   */
  GetComponentsService,
]

@Module({
  imports: [PropModule],
  providers: [...services],
  exports: [...services],
})
export class ComponentModule {}
