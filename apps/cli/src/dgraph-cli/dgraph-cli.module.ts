import { dgraphConfig, DgraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DgraphCliService } from './dgraph-cli.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dgraphConfig],
    }),
    DgraphModule,
  ],
  providers: [DgraphCliService],
  exports: [DgraphCliService],
})
export class DgraphCliModule {}
