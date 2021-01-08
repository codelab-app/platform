import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfrastructureModule } from '@codelab/backend'
import { AppModule as CodelabAppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { PageModule } from '@codelab/modules/page'
import { UserModule } from '@codelab/modules/user'

@Module({
  imports: [
    InfrastructureModule,
    CodelabAppModule,
    UserModule,
    GraphModule,
    PageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
