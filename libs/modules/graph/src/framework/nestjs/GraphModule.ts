import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { AddChildNodeCommandHandler } from '../../core/application/handlers/AddChildNodeCommandHandler'
import { AssignGraphToPageCommandHandler } from '../../core/application/handlers/AssignGraphToPageCommandHandler'
import { CreateGraphCommandHandler } from '../../core/application/handlers/CreateGraphCommandHandler'
import { DeleteNodeCommandHandler } from '../../core/application/handlers/DeleteNodeCommandHandler'
import { GetGraphQueryHandler } from '../../core/application/handlers/GetGraphQueryHandler'
import { MoveNodeCommandHandler } from '../../core/application/handlers/MoveNodeCommandHandler'
import { UpdateNodeCommandHandler } from '../../core/application/handlers/UpdateNodeCommandHandler'
import { GraphPageSaga } from '../../core/application/sagas/GraphPage.saga'
import { GraphPageCreateErrorEventHandler } from '../../core/application/sagas/GraphPageCreateErrorEventHandler'
import { AddChildNodeService } from '../../core/application/useCases/addChildNode/AddChildNodeService'
import { CreateGraphService } from '../../core/application/useCases/createGraph/CreateGraphService'
import { DeleteNodeService } from '../../core/application/useCases/deleteNode/DeleteNodeService'
import { GetGraphService } from '../../core/application/useCases/getGraph/GetGraphService'
import { MoveNodeService } from '../../core/application/useCases/moveNode/MoveNodeService'
import { UpdateNodeService } from '../../core/application/useCases/updateNode/UpdateNodeService'
import { TypeOrmEdgeRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmEdgeRepositoryAdapter'
import { TypeOrmGraphRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmGraphRepositoryAdapter'
import { TypeOrmVertexRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmVertexRepositoryAdapter'
import { GraphCommandQueryAdapter } from '../../presentation/controllers/GraphCommandQueryAdapter'
import { EdgeDITokens } from '../EdgeDITokens'
import { GraphDITokens } from '../GraphDITokens'
import { VertexDITokens } from '../VertexDITokens'
import { EdgeModule } from './EdgeModule'
import { VertexModule } from './VertexModule'

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
  AssignGraphToPageCommandHandler,
  MoveNodeCommandHandler,
  DeleteNodeCommandHandler,
  GetGraphQueryHandler,
  UpdateNodeCommandHandler,
  CreateGraphCommandHandler,
  AddChildNodeCommandHandler,
]

export const eventHandlersProviders: Array<Provider> = [
  GraphPageSaga,
  GraphPageCreateErrorEventHandler,
]

@Module({
  imports: [
    CqrsModule,
    VertexModule,
    EdgeModule,
    // EventStoreModule.registerFeature({
    // CodelabEventStoreModule.registerFeature({
    //   type: 'event-store',
    //   featureStreamName: '$svc-graph',
    //   subscriptions: [
    //     {
    //       type: EventStoreSubscriptionType.Persistent,
    //       stream: '$svc-page',
    //       persistentSubscriptionName: 'page',
    //     },
    //     {
    //       type: EventStoreSubscriptionType.Persistent,
    //       stream: '$svc-app',
    //       persistentSubscriptionName: 'app',
    //     },
    //   ],
    //   eventHandlers: {
    //     AssignGraphToPageSuccessEvent: () =>
    //       new AssignGraphToPageSuccessEvent(),
    //     AssignPageToAppSuccessEvent: () => new AssignPageToAppSuccessEvent(),
    //     PageCreatedEvent: (app, page) => new PageCreatedEvent(app, page),
    //     PageCreateErrorEvent: (page, graph) =>
    //       new PageCreateErrorEvent(page, graph),
    //   },
    // }),
  ],
  providers: [
    ...eventHandlersProviders,
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class GraphModule {}
