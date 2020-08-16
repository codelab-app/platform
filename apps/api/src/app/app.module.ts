import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiConfigModule } from '@codelab/api-config'
import { RouterModule } from '@codelab/api-router'
import { UserModule, ModelModule } from '@codelab/api-model'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppMiddleware } from './app.middleware'
@Module({
  imports: [
    ApiConfigModule,
    RouterModule,
    ModelModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/codelab-ai'),
    UserModule,
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
