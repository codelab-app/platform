import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { dgraphConfig } from './config/dgraph.config'
import { DgraphController } from './dgraph.controller'
import { DgraphRepository } from './dgraph.repository'
import { DgraphService } from './dgraph.service'
import { TransactionManager } from './transaction-manager'

@Global()
@Module({
  controllers: [DgraphController],
  imports: [ConfigModule.forFeature(dgraphConfig)],
  providers: [DgraphService, DgraphRepository, TransactionManager],
  exports: [DgraphService, DgraphRepository, TransactionManager],
})
export class DgraphModule {}
