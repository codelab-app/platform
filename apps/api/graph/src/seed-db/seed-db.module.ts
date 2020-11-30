import { Module } from '@nestjs/common'
import { CodelabAppModule } from '../models/app/codelab-app.module'
import { EdgeModule } from '../models/edge/edge.module'
import { GraphModule } from '../models/graph/graph.module'
import { PageModule } from '../models/page/page.module'
import { UserModule } from '../models/user/user.module'
import { VertexModule } from '../models/vertex/vertex.module'
import { SeedDbService } from './seed-db.service'

@Module({
  imports: [
    VertexModule,
    EdgeModule,
    GraphModule,
    UserModule,
    CodelabAppModule,
    PageModule,
  ],
  providers: [SeedDbService],
  exports: [SeedDbService],
})
export class SeedDbModule {}
