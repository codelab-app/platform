import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FederationModule } from '../federation'
import { AppController } from './app.controller'
import { AppMiddleware } from './app.middleware'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/config'
import { RestifyModule } from '@codelab/api/drivers/restify'
import { RouterModule } from '@codelab/api/router'

@Module({
  imports: [
    ConfigModule,
    FederationModule,
    // GraphqlModule,
    // Neo4jModule,
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
