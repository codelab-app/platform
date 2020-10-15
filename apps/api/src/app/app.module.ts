import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppMiddleware } from './app.middleware'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/config'
import { GraphqlModule } from '@codelab/api/graphql'
import { Neo4jModule } from '@codelab/api/neo4j'
import { RestifyModule } from '@codelab/api/restify'

@Module({
  imports: [
    GraphqlModule,
    Neo4jModule,
    ConfigModule,
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
