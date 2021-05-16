import {
  AuthModule,
  GraphqlModule,
  InfrastructureModule,
} from '@codelab/backend'
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
