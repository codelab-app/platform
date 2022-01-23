import { Module } from '@nestjs/common'
import { AdminResolver } from './application/admin.resolver'
import { ExecuteCommandService } from './use-cases/execute-command'
import { ResetDataService } from './use-cases/reset-data'

const services = [
  /**
   * Use Cases
   */
  ResetDataService,
  ExecuteCommandService,
]

@Module({
  providers: [AdminResolver, ...services],
  exports: [...services],
})
export class AdminModule {}
