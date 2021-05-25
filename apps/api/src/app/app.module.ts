import {
  AuthModule,
  GraphqlModule,
  InfrastructureModule,
} from '@codelab/backend'
import { AppModule as AppApiModule } from '@codelab/modules/app-api'
import { AtomModule } from '@codelab/modules/atom-api'
import { AtomTypeModule } from '@codelab/modules/atom-type-api'
import { LambdaApiModule } from '@codelab/modules/lambda-api'
import { PageModule } from '@codelab/modules/page-api'
import { PropModule } from '@codelab/modules/prop-api'
import { UserModule } from '@codelab/modules/user-api'
import { ValueTypeModule } from '@codelab/modules/value-type-api'
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
    PageModule,
    AtomTypeModule,
    AtomModule,
    ValueTypeModule,
    PropModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
