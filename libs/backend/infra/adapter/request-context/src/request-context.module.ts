import type { MiddlewareConsumer, NestModule } from '@nestjs/common'

import { Module } from '@nestjs/common'

import { RequestContextMiddleware } from './request-context.middleware'

/**
 * Allows access to user object https://docs.nestjs.com/recipes/async-local-storage
 *
 * We use this since the previous user decorator can only be used in controller
 */
@Module({
  exports: [RequestContextMiddleware],
  providers: [RequestContextMiddleware],
})
export class RequestContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*')
  }
}
