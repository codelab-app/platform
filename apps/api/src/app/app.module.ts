import { Module, NestModule, MiddlewareConsumer, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiConfigModule } from '@codelab/api-config'
import { RouterModule } from '@codelab/api-router'
import { SchemaModule, JSON_SCHEMA_REPOSITORY } from '@codelab/api-model'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppMiddleware } from './app.middleware'
@Module({
  imports: [ApiConfigModule, RouterModule, SchemaModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(JSON_SCHEMA_REPOSITORY) private readonly jsonSchemaRepository,
  ) {
    console.log(jsonSchemaRepository)
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes(AppController)
  }
}
