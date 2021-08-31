import { Module } from '@nestjs/common'
import { AdminResolver } from './application/admin.resolver'
import { ResetDataService } from './use-cases/reset-data'

const services = [ResetDataService]

@Module({
  providers: [AdminResolver, ...services],
  exports: [...services],
})
export class AdminModule {}
