import { InfrastructureModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app-api'
import { AtomModule } from '@codelab/modules/atom-api'
import { ElementModule } from '@codelab/modules/element-api'
import { LambdaModule } from '@codelab/modules/lambda-api'
import { PageModule } from '@codelab/modules/page-api'
import { TypeModule } from '@codelab/modules/type-api'
import { UserModule } from '@codelab/modules/user-api'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'

@Module({
  imports: [
    InfrastructureModule,
    // Domain
    AppModule,
    UserModule,
    PageModule,
    ElementModule,
    AtomModule,
    TypeModule,
    LambdaModule,
  ],
  controllers: [AppController],
})
export class CodelabAppModule {}
