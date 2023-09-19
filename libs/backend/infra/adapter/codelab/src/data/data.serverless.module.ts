/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminApplicationModule } from '@codelab/backend/application/admin'
import { JwtAuthGuard } from '@codelab/backend/application/shared'
import { UserApplicationModule } from '@codelab/backend/application/user'
import { neo4jConfig, OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { RequestContextModule } from '@codelab/backend/infra/adapter/request-context'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { endpointConfig } from '../platform/endpoint.config'
import { DemoModule } from './demo'

@Module({
  controllers: [],
  imports: [
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    //   port: 8000,
    // }),
    RequestContextModule,
    DemoModule,
    OtelModule,
    AdminApplicationModule,
    UserApplicationModule,
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [endpointConfig],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class DataServerlessModule {}
