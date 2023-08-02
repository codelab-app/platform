import { AdminModule } from '@codelab/backend/application/admin'
import { MigrationModule } from '@codelab/backend/application/migration'
import { UserModule } from '@codelab/backend/application/user'
import { neo4jConfig, OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { endpointConfig } from '../platform/endpoint.config'

@Module({
  imports: [
    OGMModule,
    AdminModule,
    MigrationModule,
    UserModule,
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [neo4jConfig, endpointConfig],
    }),
  ],
})
export class DataModule {}
