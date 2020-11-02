import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphqlConfigModule } from './graphql-config/graphql-config.module'
import { ConfigModule } from '@codelab/api/providers/config'
import { LoggerModule } from '@codelab/api/providers/logger'

@Module({
  imports: [
    LoggerModule,
    // ConfigModule.forRoot('.test.env'),
    ConfigModule.forRoot(),
    // Main
    GraphqlConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
