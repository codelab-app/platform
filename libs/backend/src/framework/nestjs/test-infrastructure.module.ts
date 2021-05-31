import { Module } from '@nestjs/common'
import {
  ApolloClientModule,
  apolloClientTestConfig,
  AwsModule,
  DGraphModule,
} from '../../infrastructure'
import { LoggerModule } from '../../infrastructure/logger/logger.module'
// import { testDatabaseConfig } from '../../infrastructure/persistence/config/DbConfig'
// import { ConfigModule } from './config.module'

@Module({
  imports: [
    LoggerModule.forRoot(),
    AwsModule,
    DGraphModule,
    ApolloClientModule.register(apolloClientTestConfig),
  ],
})
export class TestInfrastructureModule {}
