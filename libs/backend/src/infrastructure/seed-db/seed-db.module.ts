import { Module } from '@nestjs/common'
import { dgraphConfig, DgraphModule } from '../dgraph'
import { SeedDbService } from './seed-db.service'

@Module({
  imports: [DgraphModule.register(dgraphConfig)],
  providers: [SeedDbService],
  exports: [SeedDbService],
})
export class SeedDbModule {}
