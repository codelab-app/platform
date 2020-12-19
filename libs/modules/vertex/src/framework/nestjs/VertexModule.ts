import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { CreateVertexCommandHandler } from '../../core/application/handlers/CreateVertexCommandHandler'
import { DeleteVertexCommandHandler } from '../../core/application/handlers/DeleteVertexCommandHandler'
import { GetVertexByIdQueryHandler } from '../../core/application/handlers/GetVertexByIdQueryHandler'
import { GetVertexQueryHandler } from '../../core/application/handlers/GetVertexQueryHandler'
import { UpdateVertexCommandHandler } from '../../core/application/handlers/UpdateVertexCommandHandler'
import { CreateVertexService } from '../../core/application/services/CreateVertexService'
import { DeleteVertexService } from '../../core/application/services/DeleteVertexService'
import { GetVertexService } from '../../core/application/services/GetVertexService'
import { UpdateVertexService } from '../../core/application/services/UpdateVertexService'
import { TypeOrmVertexRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmVertexRepositoryAdapter'
import { VertexCommandQueryAdapter } from '../../presentation/controllers/VertexCommandQueryAdapter'
import { VertexDITokens } from '../VertexDITokens'
import { TypeOrmVertex } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [
  {
    provide: VertexDITokens.VertexRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmVertexRepositoryAdapter),
    inject: [Connection],
  },
  VertexCommandQueryAdapter,
]

export const handlerProviders: Array<Provider> = [
  CreateVertexCommandHandler,
  GetVertexQueryHandler,
  GetVertexByIdQueryHandler,
  UpdateVertexCommandHandler,
  DeleteVertexCommandHandler,
]

const useCaseProviders: Array<Provider> = [
  {
    provide: VertexDITokens.CreateVertexUseCase,
    useFactory: (vertexRepository) => new CreateVertexService(vertexRepository),
    inject: [VertexDITokens.VertexRepository],
  },
  {
    provide: VertexDITokens.GetVertexUseCase,
    useFactory: (vertexRepository) => new GetVertexService(vertexRepository),
    inject: [VertexDITokens.VertexRepository],
  },
  {
    provide: VertexDITokens.UpdateVertexUseCase,
    useFactory: (vertexRepository) => new UpdateVertexService(vertexRepository),
    inject: [VertexDITokens.VertexRepository],
  },
  {
    provide: VertexDITokens.DeleteVertexUseCase,
    useFactory: (vertexRepository) => new DeleteVertexService(vertexRepository),
    inject: [VertexDITokens.VertexRepository],
  },
]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TypeOrmVertex])],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
  controllers: [],
})
export class VertexModule {}
