import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { dgraphConfig } from './config/dgraph.config'
import { DgraphController } from './dgraph.controller'
import { DgraphRepository } from './dgraph.repository'
import { DgraphService } from './dgraph.service'

@Global()
@Module({
  controllers: [DgraphController],
  imports: [ConfigModule.forFeature(dgraphConfig)],
  providers: [DgraphService, DgraphRepository],
  exports: [DgraphService, DgraphRepository],
})
export class DgraphModule {}
