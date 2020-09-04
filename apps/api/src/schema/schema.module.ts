import { MiddlewareConsumer, NestModule } from '@nestjs/common'

export class SchemaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    throw new Error('Method not implemented.')
  }
}
