import { Module } from '@nestjs/common'
import { GraphService } from '../../core/application/services/GraphService'
import { AddChildVertexService } from '../../core/application/useCases/addChildVertex/AddChildVertexService'
import { CreateGraphService } from '../../core/application/useCases/createGraph/CreateGraphService'
import { GetGraphService } from '../../core/application/useCases/getGraph/GetGraphService'
import { GetTreeService } from '../../core/application/useCases/getTree/GetTreeService'
import { GraphResolvers } from '../../presentation/controllers/GraphResolvers'
import { EdgeModule } from './EdgeModule'
import { VertexModule } from './VertexModule'

@Module({
  imports: [VertexModule, EdgeModule],
  providers: [
    GraphService,
    /**
     * Controllers
     */
    GraphResolvers,
    /**
     * UseCaseProviders
     */
    GetTreeService,
    GetGraphService,
    CreateGraphService,
    AddChildVertexService,
  ],
  exports: [GraphService],
})
export class GraphModule {}
