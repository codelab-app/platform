import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppMiddleware } from './app.middleware'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/config'
import { GraphqlModule } from '@codelab/api/graphql'
import { Neo4jModule } from '@codelab/api/neo4j'
import { RouterModule } from '@codelab/api/router'

@Module({
  imports: [
    GraphqlModule,
    Neo4jModule,
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
