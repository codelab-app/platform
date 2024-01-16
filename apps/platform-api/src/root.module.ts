import {
  DataModule,
  GraphqlModule,
} from '@codelab/backend/infra/adapter/codelab'
import { Module } from '@nestjs/common'
import { HealthcheckController } from './healthcheck.controller'

@Module({
  controllers: [HealthcheckController],
  imports: [GraphqlModule, DataModule],
  providers: [],
})
export class RootModule {}
