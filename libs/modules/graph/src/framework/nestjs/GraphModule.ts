import { Module } from '@nestjs/common'
import { GraphService } from '../../core/application/services/GraphService'
import { AddChildNodeService } from '../../core/application/useCases/addChildNode/AddChildNodeService'
import { CreateGraphService } from '../../core/application/useCases/createGraph/CreateGraphService'
import { GetGraphService } from '../../core/application/useCases/getGraph/GetGraphService'
import { MoveNodeService } from '../../core/application/useCases/moveNode/MoveNodeService'
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
    MoveNodeService,
    GetGraphService,
    CreateGraphService,
    AddChildNodeService,
  ],
  exports: [GraphService],
})
export class GraphModule {}
