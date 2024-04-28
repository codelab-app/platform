import {
  AuthMiddleware,
  AuthModule,
  JwtAuthGuard,
} from '@codelab/backend/application/auth'
import { authMiddleware } from '@codelab/backend/infra/adapter/graphql'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import type { MiddlewareConsumer } from '@nestjs/common'
import { Module, RequestMethod } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ApiModule } from './api/api.module'
import { GraphqlModule } from './graphql/graphql.module'
import { HealthcheckController } from './healthcheck.controller'

@Module({
  controllers: [HealthcheckController],
  imports: [AuthModule, GraphqlModule, ApiModule, CodelabLoggerModule],
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
  //     .apply(AuthMiddleware)
  //     // This needs to be `/graphql` since `/api` is added as a `globalPrefix`
  //     .forRoutes({ method: RequestMethod.ALL, path: '/graphql' })
  // }
}
