import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { AddChildNodeCommandHandler } from '../../core/application/handlers/AddChildNodeCommandHandler'
import { CreateGraphCommandHandler } from '../../core/application/handlers/CreateGraphCommandHandler'
import { GetGraphQueryHandler } from '../../core/application/handlers/GetGraphQueryHandler'
import { AddChildNodeService } from '../../core/application/services/AddChildNodeService'
import { CreateGraphService } from '../../core/application/services/CreateGraphService'
import { GetGraphService } from '../../core/application/services/GetGraphService'
import { TypeOrmEdgeRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmEdgeRepositoryAdapter'
import { TypeOrmGraphRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmGraphRepositoryAdapter'
import { TypeOrmVertexRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmVertexRepositoryAdapter'
import { GraphCommandQueryAdapter } from '../../presentation/controllers/GraphCommandQueryAdapter'
import { EdgeDITokens } from '../EdgeDITokens'
import { GraphDITokens } from '../GraphDITokens'
import { VertexDITokens } from '../VertexDITokens'

export const persistenceProviders: Array<Provider> = [
  {
    provide: GraphDITokens.GraphRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmGraphRepositoryAdapter),
    inject: [Connection],
  },
  {
    provide: VertexDITokens.VertexRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmVertexRepositoryAdapter),
    inject: [Connection],
  },
  {
    provide: EdgeDITokens.EdgeRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmEdgeRepositoryAdapter),
    inject: [Connection],
  },
  GraphCommandQueryAdapter,
]

const useCaseProviders: Array<Provider> = [
  {
    provide: GraphDITokens.CreateGraphUseCase,
    useFactory: (graphRepository) => new CreateGraphService(graphRepository),
    inject: [GraphDITokens.GraphRepository],
  },
  {
    provide: GraphDITokens.GetGraphUseCase,
    useFactory: (graphRepository, vertexRepository, edgeRepository) =>
      new GetGraphService(graphRepository, vertexRepository, edgeRepository),
    inject: [
      GraphDITokens.GraphRepository,
      VertexDITokens.VertexRepository,
      EdgeDITokens.EdgeRepository,
    ],
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
  CreateGraphCommandHandler,
  GetGraphQueryHandler,
  AddChildNodeCommandHandler,
]

@Module({
  imports: [CqrsModule],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class GraphModule {}
