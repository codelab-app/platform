import {
  AuthModule,
  GraphqlModule,
  InfrastructureModule,
} from '@codelab/backend'
import { AppModule as AppApiModule } from '@codelab/modules/app-api'
import { AtomModule } from '@codelab/modules/atom-api'
import { AtomTypeModule } from '@codelab/modules/atom-type-api'
import { LambdaApiModule } from '@codelab/modules/lambda-api'
import { UserModule } from '@codelab/modules/user-api'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    InfrastructureModule,
    LambdaApiModule,
    AuthModule,
    GraphqlModule,
    UserModule,
    AppApiModule,
    AtomTypeModule,
    AtomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
