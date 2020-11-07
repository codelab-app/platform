import { Module, OnModuleInit } from '@nestjs/common'
import * as shell from 'shelljs'
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
export class AppModule implements OnModuleInit {
  onModuleInit(): any {
    if (process.argv.includes('--reset')) {
      if (
        shell.exec('make -C apps/api/graph hasura-metadata-import').code !== 0
      ) {
        shell.echo('make hasura-metadata-import failed')
        shell.exit(1)
      }
    }
  }
}
