import { Module, Provider } from '@nestjs/common'
import { AddChildNodeService } from '../../core/application/useCases/addChildNode/AddChildNodeService'
import { CreateGraphService } from '../../core/application/useCases/createGraph/CreateGraphService'
import { DeleteNodeService } from '../../core/application/useCases/deleteNode/DeleteNodeService'
import { GetGraphService } from '../../core/application/useCases/getGraph/GetGraphService'
import { MoveNodeService } from '../../core/application/useCases/moveNode/MoveNodeService'
import { UpdateNodeService } from '../../core/application/useCases/updateNode/UpdateNodeService'
import { GraphGraphqlAdapter } from '../../presentation/controllers/GraphGraphqlAdapter'
import { GraphDITokens } from '../GraphDITokens'
import { EdgeModule } from './EdgeModule'
import { VertexModule } from './VertexModule'
import { PrismaDITokens } from '@codelab/backend'

const useCaseProviders: Array<Provider> = [
  {
    provide: GraphDITokens.MoveNodeUseCase,
    useFactory: (prismaService) => new MoveNodeService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: GraphDITokens.DeleteNodeUseCase,
    useFactory: (prismaService) => new DeleteNodeService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: GraphDITokens.GetGraphUseCase,
    useFactory: (prismaService) => new GetGraphService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: GraphDITokens.UpdateNodeUseCase,
    useFactory: (prismaService) => new UpdateNodeService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: GraphDITokens.CreateGraphUseCase,
    useFactory: (prismaService) => new CreateGraphService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: GraphDITokens.AddChildNodeUseCase,
    useFactory: (prismaService) => new AddChildNodeService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
]

@Module({
  imports: [VertexModule, EdgeModule],
  providers: [GraphGraphqlAdapter, ...useCaseProviders],
})
export class GraphModule {}
