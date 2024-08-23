import { AuthModule, JwtAuthGuard } from '@codelab/backend/application/auth'
import { GraphqlModule } from '@codelab/backend/infra/adapter/graphql'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ApiModule } from './api/api.module'
import { HealthcheckController } from './healthcheck.controller'

@Module({
  controllers: [HealthcheckController],
  imports: [
    AuthModule,
    GraphqlModule,
    ApiModule,
    CodelabLoggerModule,
    EventEmitterModule.forRoot(),
  ],
  /**
   * Need this to guard all controllers to inject the proper user into context
   *
   * But this doesn't work for `GraphQLModule` at `/api/graphql`, we use middleware for that below
   *
   * GraphQL in NestJS is handled through a single route and processed internally by the Apollo Server
   */
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class RootModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(JwtAuthMiddleware)
  //     // This needs to be `/graphql` since `/api/v1` is added as a `globalPrefix`
  //     .forRoutes({ method: RequestMethod.ALL, path: '/graphql' })
  // }
}
