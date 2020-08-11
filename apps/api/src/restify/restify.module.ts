import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'

@Module({})
export class RestifyModule implements NestModule {
  // constructor() {
  // restify.serve(router, field)
  // }

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(SchemaMiddleware).forRoutes(SchemaController)
  }
}
