import { Void } from '@codelab/backend/abstract/types'
import { Module, Provider } from '@nestjs/common'

const services: Array<Provider> = []

@Module({
  imports: [],
  providers: [...services, Void],
  exports: [...services],
})
export class HookModule {}
