/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminModule } from '@codelab/backend/application/admin'
import { MigrationModule } from '@codelab/backend/application/migration'
import { UserModule } from '@codelab/backend/application/user'
import { neo4jConfig, OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { context } from '@opentelemetry/api'
import { AsyncLocalStorage } from 'async_hooks'
import { AlsModule } from '../als.module'
import { endpointConfig } from '../platform/endpoint.config'
import { DemoModule } from './demo'
import { DemoController } from './demo/demo.controller'

@Module({
  controllers: [],
  imports: [
    DemoModule,
    OtelModule,
    OGMModule,
    AdminModule,
    MigrationModule,
    UserModule,
    AlsModule,
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [neo4jConfig, endpointConfig],
    }),
  ],
})
export class DataModule implements NestModule {
  constructor(
    // inject the AsyncLocalStorage in the module constructor,
    private readonly als: AsyncLocalStorage<unknown>,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    // bind the middleware,
    consumer
      .apply((req: any, res: any, next: any) => {
        // populate the store with some default values
        // based on the request,
        const store = {
          context,
        }

        // and pass the "next" function as callback
        // to the "als.run" method together with the store.
        this.als.run(store, () => next())
      })
      // and register it for all routes (in case of Fastify use '(.*)')
      .forRoutes('*')
  }
}
