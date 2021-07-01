import { InfrastructureModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app-api'
import { AtomModule } from '@codelab/modules/atom-api'
import { LambdaApiModule } from '@codelab/modules/lambda-api'
import { PageModule } from '@codelab/modules/page-api'
import { PageElementModule } from '@codelab/modules/page-element-api'
import { PropModule } from '@codelab/modules/prop-api'
import { TypeModule } from '@codelab/modules/type-api'
import { UserModule } from '@codelab/modules/user-api'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'

@Module({
  imports: [
    InfrastructureModule,
    // Domain
    AppModule,
    LambdaApiModule,
    UserModule,
    PageModule,
    PageElementModule,
    AtomModule,
    PropModule,
    TypeModule,
  ],
  controllers: [AppController],
})
export class CodelabAppModule {}
