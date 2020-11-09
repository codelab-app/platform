import { Module } from '@nestjs/common'
import { EdgeModule, GraphModule, UserModule, VertexModule } from '../models'
import { SeedDbService } from './seed-db.service'

@Module({
  imports: [VertexModule, EdgeModule, GraphModule, UserModule],
  providers: [SeedDbService],
  exports: [SeedDbService],
})
export class SeedDbModule {}
