import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { CreateGraphCommandHandler } from '../../core/application/handlers/CreateGraphCommandHandler'
import { GetGraphQueryHandler } from '../../core/application/handlers/GetGraphQueryHandler'
import { CreateGraphService } from '../../core/application/services/CreateGraphService'
import { GetGraphService } from '../../core/application/services/GetGraphService'
import { TypeOrmGraphRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmGraphRepositoryAdapter'
import { GraphCommandQueryAdapter } from '../../presentation/controllers/GraphCommandQueryAdapter'
import { GraphDITokens } from '../GraphDITokens'

export const persistenceProviders: Array<Provider> = [
  {
    provide: GraphDITokens.GraphRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmGraphRepositoryAdapter),
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
    useFactory: (graphRepository) => new GetGraphService(graphRepository),
    inject: [GraphDITokens.GraphRepository],
  },
]

export const handlerProviders: Array<Provider> = [
  CreateGraphCommandHandler,
  GetGraphQueryHandler,
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
