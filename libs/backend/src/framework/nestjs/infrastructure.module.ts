import { Module } from '@nestjs/common'
import { PrismaModule } from '../../infrastructure'
import { GraphqlModule } from '../../infrastructure/graphql/GraphqlModule'
import { LoggerModule } from '../../infrastructure/logger/logger.module'
import { AwsModule } from '../../infrastructure/persistence/aws/AwsModule'
import { databaseConfig } from '../../infrastructure/persistence/config/DbConfig'
import { ConfigModule } from './config.module'

@Module({
  imports: [
    LoggerModule.forRoot(),
    PrismaModule,
    AwsModule,
    GraphqlModule,
    ConfigModule.register(databaseConfig),
  ],
})
export class InfrastructureModule {}
