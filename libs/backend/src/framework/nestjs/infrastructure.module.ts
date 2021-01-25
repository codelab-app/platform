import { Module } from '@nestjs/common'
import { GraphqlModule } from '../../infrastructure/graphql/GraphqlModule'
import { databaseConfig } from '../../infrastructure/persistence/config/DbConfig'
import { PrismaModule } from '../../infrastructure/persistence/prisma/PrismaModule'
import { ConfigModule } from './config.module'

@Module({
  imports: [PrismaModule, GraphqlModule, ConfigModule.register(databaseConfig)],
})
export class InfrastructureModule {}
