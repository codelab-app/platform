import { AuthModule } from '@codelab/modules/auth-api'
import { Module } from '@nestjs/common'
import {
  ApolloClientModule,
  apolloClientTestConfig,
  DGraphModule,
  GraphqlModule,
} from '../../infrastructure'
import { LoggerModule } from '../../infrastructure/logger/logger.module'

@Module({
  imports: [
    LoggerModule.forRoot(),
    // AwsModule,
    GraphqlModule,
    DGraphModule,
    AuthModule,
    ApolloClientModule.register(apolloClientTestConfig),
  ],
})
export class TestInfrastructureModule {}
