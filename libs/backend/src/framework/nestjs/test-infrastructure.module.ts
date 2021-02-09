import { Module } from '@nestjs/common'
import { GraphqlModule } from '../../infrastructure'
import { LoggerModule } from '../../infrastructure/logger/logger.module'
import { testDatabaseConfig } from '../../infrastructure/persistence/config/DbConfig'
import { PrismaModule } from '../../infrastructure/persistence/prisma/PrismaModule'
import { ConfigModule } from './config.module'

@Module({
  imports: [
    LoggerModule.forRoot(),
    PrismaModule,
    GraphqlModule,
    ConfigModule.register(testDatabaseConfig),
  ],
})
export class TestInfrastructureModule {}
