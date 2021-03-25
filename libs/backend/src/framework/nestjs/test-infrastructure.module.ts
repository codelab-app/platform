import { Module } from '@nestjs/common'
import { LoggerModule } from '../../infrastructure/logger/logger.module'
import { testDatabaseConfig } from '../../infrastructure/persistence/config/DbConfig'
import { ConfigModule } from './config.module'

@Module({
  imports: [
    LoggerModule.forRoot(),
    // GraphqlModule,
    ConfigModule.register(testDatabaseConfig),
  ],
})
export class TestInfrastructureModule {}
