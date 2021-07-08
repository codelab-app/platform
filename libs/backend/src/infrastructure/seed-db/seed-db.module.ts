import { Module } from '@nestjs/common'
import { SeedDbService } from './seed-db.service';
import { dgraphConfig, DgraphModule } from '../dgraph';

@Module({
  imports: [DgraphModule.register(dgraphConfig)],
  providers: [SeedDbService],
  exports: [SeedDbService]
})
export class SeedDbModule {

}
