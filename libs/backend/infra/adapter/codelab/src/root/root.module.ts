import { Module } from '@nestjs/common'
import { DataServerlessModule } from '../data/data.serverless.module'
import { PlatformServerlessModule } from '../platform/platform.serverless.module'
import { HealthcheckController } from './healthcheck.controller'

@Module({
  controllers: [HealthcheckController],
  imports: [PlatformServerlessModule, DataServerlessModule],
  providers: [],
})
export class RootModule {}
