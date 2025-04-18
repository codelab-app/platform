import { AuthModule, JwtAuthGuard } from '@codelab/backend-application-auth'
import { HealthcheckController } from '@codelab/backend-domain-shared-modules'
import { GraphqlModule } from '@codelab/backend-infra-adapter-graphql'
import {
  CodelabLoggerModule,
  LoggerMiddleware,
} from '@codelab/backend-infra-adapter-logger'
import { QueueModule } from '@codelab/backend-infra-adapter-queue'
import { WsModule } from '@codelab/backend-infra-adapter-ws'
import { CommandBusSubscription } from '@codelab/backend-infra-core'
import {
  GraphQLSchemaModule,
  SchemaService,
} from '@codelab/backend-infra-adapter-neo4j-schema'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { SentryModule } from '@sentry/nestjs/setup'

import { ApiModule } from './api/api.module'

@Module({
  controllers: [HealthcheckController],
  imports: [
    SentryModule.forRoot(),
    GraphqlModule.forRootAsync({
      imports: [GraphQLSchemaModule],
      inject: [SchemaService],
    }),
    WsModule,
    QueueModule,
    AuthModule,
    ApiModule,
    CodelabLoggerModule,
    CqrsModule,
  ],
  /**
   * Need this to guard all controllers to inject the proper user into context
   *
   * But this doesn't work for `GraphQLModule` at `/api/v1/graphql`, we use middleware for that below
   *
   * GraphQL in NestJS is handled through a single route and processed internally by the Apollo Server
   */
  providers: [
    CommandBusSubscription,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class RootModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // This needs to be `/graphql` since `/api/v1` is added as a `globalPrefix`
      .exclude({ method: RequestMethod.POST, path: '/graphql' })
      .forRoutes({ method: RequestMethod.ALL, path: '*' })
  }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(JwtAuthMiddleware)
  //     // This needs to be `/graphql` since `/api/v1` is added as a `globalPrefix`
  //     .forRoutes({ method: RequestMethod.ALL, path: '/graphql' })
  // }
}
