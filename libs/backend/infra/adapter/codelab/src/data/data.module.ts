import { UserModule } from '@codelab/backend/application/user'
import { neo4jConfig } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { endpointConfig } from '../platform/endpoint.config'

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [neo4jConfig, endpointConfig],
    }),
  ],
})
export class DataModule {}
