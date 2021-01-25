import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AddChildNodeCommandHandler } from '../../core/application/handlers/AddChildNodeCommandHandler'
import { CreateGraphCommandHandler } from '../../core/application/handlers/CreateGraphCommandHandler'
import { DeleteNodeCommandHandler } from '../../core/application/handlers/DeleteNodeCommandHandler'
import { GetGraphQueryHandler } from '../../core/application/handlers/GetGraphQueryHandler'
import { MoveNodeCommandHandler } from '../../core/application/handlers/MoveNodeCommandHandler'
import { UpdateNodeCommandHandler } from '../../core/application/handlers/UpdateNodeCommandHandler'
import { AddChildNodeService } from '../../core/application/useCases/addChildNode/AddChildNodeService'
import { CreateGraphService } from '../../core/application/useCases/createGraph/CreateGraphService'
import { DeleteNodeService } from '../../core/application/useCases/deleteNode/DeleteNodeService'
import { GetGraphService } from '../../core/application/useCases/getGraph/GetGraphService'
import { MoveNodeService } from '../../core/application/useCases/moveNode/MoveNodeService'
import { UpdateNodeService } from '../../core/application/useCases/updateNode/UpdateNodeService'
import { PrismaEdgeRepositoryAdapter } from '../../infrastructure/persistence/PrismaEdgeRepositoryAdapter'
import { PrismaGraphRepositoryAdapter } from '../../infrastructure/persistence/PrismaGraphRepositoryAdapter'
import { PrismaVertexRepositoryAdapter } from '../../infrastructure/persistence/PrismaVertexRepositoryAdapter'
import { GraphCommandQueryAdapter } from '../../presentation/controllers/GraphCommandQueryAdapter'
import { EdgeDITokens } from '../EdgeDITokens'
import { GraphDITokens } from '../GraphDITokens'
import { VertexDITokens } from '../VertexDITokens'
import { EdgeModule } from './EdgeModule'
import { VertexModule } from './VertexModule'
import { PrismaDITokens } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [
  {
    provide: GraphDITokens.GraphRepository,
    useFactory: (prismaService) =>
      new PrismaGraphRepositoryAdapter(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: VertexDITokens.VertexRepository,
    useFactory: (prismaService) =>
      new PrismaVertexRepositoryAdapter(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: EdgeDITokens.EdgeRepository,
    useFactory: (prismaService) =>
      new PrismaEdgeRepositoryAdapter(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  GraphCommandQueryAdapter,
]

const useCaseProviders: Array<Provider> = [
  {
    provide: GraphDITokens.MoveNodeUseCase,
    useFactory: (graphRepository, edgeRepository) =>
      new MoveNodeService(graphRepository, edgeRepository),
    inject: [GraphDITokens.GraphRepository, EdgeDITokens.EdgeRepository],
  },
  {
    provide: GraphDITokens.DeleteNodeUseCase,
    useFactory: (graphRepository, vertexRepository, edgeRepository) =>
      new DeleteNodeService(graphRepository, vertexRepository, edgeRepository),
    inject: [
      GraphDITokens.GraphRepository,
      VertexDITokens.VertexRepository,
      EdgeDITokens.EdgeRepository,
    ],
  },
  {
    provide: GraphDITokens.GetGraphUseCase,
    useFactory: (graphRepository) => new GetGraphService(graphRepository),
    inject: [GraphDITokens.GraphRepository],
  },
  {
    provide: GraphDITokens.UpdateNodeUseCase,
    useFactory: (graphRepository, vertexRepository) =>
      new UpdateNodeService(graphRepository, vertexRepository),
    inject: [GraphDITokens.GraphRepository, VertexDITokens.VertexRepository],
  },
  {
    provide: GraphDITokens.CreateGraphUseCase,
    useFactory: (graphRepository) => new CreateGraphService(graphRepository),
    inject: [GraphDITokens.GraphRepository],
  },
  {
    provide: GraphDITokens.AddChildNodeUseCase,
    useFactory: (graphRepository, vertexRepository, edgeRepository) =>
      new AddChildNodeService(
        graphRepository,
        vertexRepository,
        edgeRepository,
      ),
    inject: [
      GraphDITokens.GraphRepository,
      VertexDITokens.VertexRepository,
      EdgeDITokens.EdgeRepository,
    ],
  },
]

export const handlerProviders: Array<Provider> = [
  MoveNodeCommandHandler,
  DeleteNodeCommandHandler,
  GetGraphQueryHandler,
  UpdateNodeCommandHandler,
  CreateGraphCommandHandler,
  AddChildNodeCommandHandler,
]

export const eventHandlersProviders: Array<Provider> = []

@Module({
  imports: [CqrsModule, VertexModule, EdgeModule],
  providers: [
    ...eventHandlersProviders,
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class GraphModule {}
