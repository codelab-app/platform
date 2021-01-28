import { Module } from '@nestjs/common'
import { GraphService } from '../../core/application/services/GraphService'
import { AddChildNodeService } from '../../core/application/useCases/addChildNode/AddChildNodeService'
import { CreateGraphService } from '../../core/application/useCases/createGraph/CreateGraphService'
import { DeleteNodeService } from '../../core/application/useCases/deleteNode/DeleteNodeService'
import { GetGraphService } from '../../core/application/useCases/getGraph/GetGraphService'
import { MoveNodeService } from '../../core/application/useCases/moveNode/MoveNodeService'
import { UpdateNodeService } from '../../core/application/useCases/updateNode/UpdateNodeService'
import { GraphGraphqlAdapter } from '../../presentation/controllers/GraphGraphqlAdapter'
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
    GraphGraphqlAdapter,
    /**
     * UseCaseProviders
     */
    MoveNodeService,
    DeleteNodeService,
    GetGraphService,
    UpdateNodeService,
    CreateGraphService,
    AddChildNodeService,
  ],
  exports: [GraphService],
})
export class GraphModule {}
