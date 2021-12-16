import { Void } from '@codelab/backend/abstract/types'
import { Module, Provider } from '@nestjs/common'
import { HookInfrastructureModule } from './infrastructure'

const services: Array<Provider> = []

@Module({
  imports: [],
  providers: [...services, Void],
  exports: [...services, Void],
})
export class HookCoreModule {}

@Module({
  imports: [HookCoreModule, HookInfrastructureModule],
  providers: [...services, Void],
  exports: [...services],
})
export class HookModule {}
