import { Module } from '@nestjs/common'
import { DgraphModule } from '../dgraph'
import { SeedDbService } from './seed-db.service'

@Module({
  imports: [DgraphModule],
  providers: [SeedDbService],
  exports: [SeedDbService],
})
export class SeedDbModule {}
