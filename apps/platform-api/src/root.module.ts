import { Module } from '@nestjs/common'
import { ApiModule } from './api/api.module'
import { GraphqlModule } from './graphql/graphql.module'
import { HealthcheckController } from './healthcheck.controller'

@Module({
  controllers: [HealthcheckController],
  imports: [GraphqlModule, ApiModule],
  providers: [],
})
export class RootModule {}
