import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { Module } from '@nestjs/common'
import { ApiModule } from './api/api.module'
import { GraphqlModule } from './graphql/graphql.module'
import { HealthcheckController } from './healthcheck.controller'

@Module({
  controllers: [HealthcheckController],
  imports: [GraphqlModule, ApiModule, CodelabLoggerModule],
  providers: [],
})
export class RootModule {}
