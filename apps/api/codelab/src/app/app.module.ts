import { EventStoreModule } from '@juicycleff/nestjs-event-store'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HeroesGameModule } from './heroes/heroes.module'
import { InfrastructureModule } from '@codelab/backend'
import { AppModule as CodelabAppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { PageModule } from '@codelab/modules/page'
import { UserModule } from '@codelab/modules/user'

@Module({
  imports: [
    HeroesGameModule,
    InfrastructureModule,
    CodelabAppModule,
    UserModule,
    GraphModule,
    PageModule,
    EventStoreModule.register({
      type: 'event-store',
      options: {},
      tcpEndpoint: {
        host: 'localhost',
        port: 1113,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
