import { Void } from '@codelab/backend/abstract/types'
import { Module, Provider } from '@nestjs/common'
import { HookModelFactory } from './application'

const services: Array<Provider> = [HookModelFactory]

@Module({
  imports: [],
  providers: [...services, Void],
  exports: [...services],
})
export class HookModule {}
