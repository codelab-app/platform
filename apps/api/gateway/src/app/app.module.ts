import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FederationModule } from '../federation'
import { AppController } from './app.controller'
import { AppMiddleware } from './app.middleware'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/providers/config'
import { LoggerModule } from '@codelab/api/providers/logger'
import { RouterModule } from '@codelab/api/providers/router'
import { RestifyModule } from '@codelab/api/services/restify'

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    // Main code
    FederationModule,
    RouterModule,
    RestifyModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/codelab-ai'),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes(AppController)
  }
}
