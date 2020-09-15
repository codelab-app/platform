import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppMiddleware } from './app.middleware'
import { AppService } from './app.service'
import { ApiConfigModule } from '@codelab/api-config'
import { RestifyModule } from '@codelab/api-restify'

@Module({
  imports: [
    ApiConfigModule,
    RestifyModule,
    // RouterModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/codelab-ai'),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes(AppController)
  }
}
