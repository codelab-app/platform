import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/providers/config'
import { LoggerModule } from '@codelab/api/providers/logger'
import { RouterModule } from '@codelab/api/providers/router'
import {
  EdgeModule,
  HasuraModule,
  OrmModule,
  VertexModule,
} from '@codelab/api/services/graph'

@Module({
  imports: [
    RouterModule,
    LoggerModule,
    ConfigModule.forRoot(),
    HasuraModule,
    OrmModule,
    EdgeModule,
    VertexModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
