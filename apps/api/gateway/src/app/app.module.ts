import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { FederationModule } from '../federation'
import { AppController } from './app.controller'
import { AppMiddleware } from './app.middleware'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/config'
import { RouterModule } from '@codelab/api/router'

@Module({
  imports: [
    FederationModule,
    // GraphqlModule,
    // Neo4jModule,
    ConfigModule,
    RouterModule,
    // RestifyModule,
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/codelab-ai'),
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
