/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminModule } from '@codelab/backend/application/admin'
import { MigrationModule } from '@codelab/backend/application/migration'
import { UserModule } from '@codelab/backend/application/user'
import { neo4jConfig, OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { endpointConfig } from '../platform/endpoint.config'
import { DemoModule } from './demo'

@Module({
  controllers: [],
  imports: [
    DemoModule,
    OtelModule,
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
