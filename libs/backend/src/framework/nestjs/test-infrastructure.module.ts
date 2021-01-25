import { Module } from '@nestjs/common'
import { GraphqlModule } from '../../infrastructure'
import { testDatabaseConfig } from '../../infrastructure/persistence/config/DbConfig'
import { PrismaModule } from '../../infrastructure/persistence/prisma/PrismaModule'
import { ConfigModule } from './config.module'

@Module({
  imports: [
    PrismaModule,
    GraphqlModule,
    ConfigModule.register(testDatabaseConfig),
  ],
})
export class TestInfrastructureModule {}
