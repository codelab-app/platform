import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { dgraphConfig } from './config/dgraphConfig'
import { DGraphService } from './dgraph.service'

@Module({
  imports: [ConfigModule.forFeature(dgraphConfig)],
  providers: [DGraphService],
  exports: [DGraphService],
})
export class DGraphModule {}
