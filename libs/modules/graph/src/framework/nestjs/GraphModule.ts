import { Module } from '@nestjs/common'
import { GraphService } from '../../core/application/services/GraphService'
import { AddChildVertexService } from '../../core/application/useCases/addChildVertex/AddChildVertexService'
import { CreateGraphService } from '../../core/application/useCases/createGraph/CreateGraphService'
import { GetGraphService } from '../../core/application/useCases/getGraph/GetGraphService'
import { GraphResolvers } from '../../presentation/controllers/GraphResolvers'
import { EdgeModule } from './EdgeModule'
import { VertexModule } from './VertexModule'
import { PrismaService } from '@codelab/backend'

@Module({
  imports: [VertexModule, EdgeModule],
  providers: [
    PrismaService,
    GraphService,
    /**
     * Controllers
     */
    GraphResolvers,
    /**
     * UseCaseProviders
     */
    GetGraphService,
    CreateGraphService,
    AddChildVertexService,
  ],
  exports: [GraphService],
})
export class GraphModule {}
