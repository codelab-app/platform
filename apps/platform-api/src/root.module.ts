import { Module } from '@nestjs/common'
import { DataModule } from './data/data.module'
import { GraphqlModule } from './graphql/graphql.module'
import { HealthcheckController } from './healthcheck.controller'

@Module({
  controllers: [HealthcheckController],
  imports: [GraphqlModule, DataModule],
  providers: [],
})
export class RootModule {}
