import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HeroesGameModule } from './heroes/heroes.module'
import { InfrastructureModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { LambdaModule } from '@codelab/modules/lambda'
import { PageModule } from '@codelab/modules/page'
import { StyleModule } from '@codelab/modules/style'
import { UserModule } from '@codelab/modules/user'

@Module({
  imports: [
    HeroesGameModule,
    InfrastructureModule,
    AppModule,
    UserModule,
    GraphModule,
    PageModule,
    StyleModule,
    LambdaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class CodelabAppModule {}
