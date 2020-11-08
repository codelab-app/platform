import { Module } from '@nestjs/common'
import { EdgeModule } from '../edge'
import { GraphModule } from '../graph'
import { VertexModule } from '../vertex'
import { SeedDbService } from './seed-db.service'
import { ApiServicesUserModule } from '@codelab/api/services/user'

@Module({
  imports: [VertexModule, EdgeModule, GraphModule, ApiServicesUserModule],
  providers: [SeedDbService],
  exports: [SeedDbService],
})
export class SeedDbModule {}
