import { Void } from '@codelab/backend/infra'
import { Module, Provider } from '@nestjs/common'
import { HookAdapter } from './application'

const services: Array<Provider> = [HookAdapter]

@Module({
  imports: [],
  providers: [...services, Void],
  exports: [...services],
})
export class HookModule {}
