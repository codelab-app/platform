import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { CreateEdgeCommandHandler } from '../../core/application/handlers/CreateEdgeCommandHandler'
import { DeleteEdgeCommandHandler } from '../../core/application/handlers/DeleteEdgeCommandHandler'
import { GetEdgeByIdQueryHandler } from '../../core/application/handlers/GetEdgeByIdQueryHandler'
import { GetEdgeQueryHandler } from '../../core/application/handlers/GetEdgeQueryHandler'
import { UpdateEdgeCommandHandler } from '../../core/application/handlers/UpdateEdgeCommandHandler'
import { CreateEdgeService } from '../../core/application/services/CreateEdgeService'
import { DeleteEdgeService } from '../../core/application/services/DeleteEdgeService'
import { GetEdgeService } from '../../core/application/services/GetEdgeService'
import { UpdateEdgeService } from '../../core/application/services/UpdateEdgeService'
import { TypeOrmEdgeRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmEdgeRepositoryAdapter'
import { EdgeCommandQueryAdapter } from '../../presentation/controllers/EdgeCommandQueryAdapter'
import { EdgeDITokens } from '../EdgeDITokens'

export const persistenceProviders: Array<Provider> = [
  {
    provide: EdgeDITokens.EdgeRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmEdgeRepositoryAdapter),
    inject: [Connection],
  },
  EdgeCommandQueryAdapter,
]

export const handlerProviders: Array<Provider> = [
  CreateEdgeCommandHandler,
  GetEdgeQueryHandler,
  GetEdgeByIdQueryHandler,
  UpdateEdgeCommandHandler,
  DeleteEdgeCommandHandler,
]

const useCaseProviders: Array<Provider> = [
  {
    provide: EdgeDITokens.CreateEdgeUseCase,
    useFactory: (edgeRepository) => new CreateEdgeService(edgeRepository),
    inject: [EdgeDITokens.EdgeRepository],
  },
  {
    provide: EdgeDITokens.GetEdgeUseCase,
    useFactory: (edgeRepository) => new GetEdgeService(edgeRepository),
    inject: [EdgeDITokens.EdgeRepository],
  },
  {
    provide: EdgeDITokens.UpdateEdgeUseCase,
    useFactory: (edgeRepository) => new UpdateEdgeService(edgeRepository),
    inject: [EdgeDITokens.EdgeRepository],
  },
  {
    provide: EdgeDITokens.DeleteEdgeUseCase,
    useFactory: (edgeRepository) => new DeleteEdgeService(edgeRepository),
    inject: [EdgeDITokens.EdgeRepository],
  },
]

@Module({
  imports: [CqrsModule],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class EdgeModule {}
