import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { CreateVertexCommandHandler } from '../../core/application/handlers/CreateVertexCommandHandler'
import { GetVertexByIdQueryHandler } from '../../core/application/handlers/GetVertexByIdQueryHandler'
import { GetVertexQueryHandler } from '../../core/application/handlers/GetVertexQueryHandler'
import { CreateVertexService } from '../../core/application/services/CreateVertexService'
import { GetVertexService } from '../../core/application/services/GetVertexService'
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
]

const useCaseProviders: Array<Provider> = [
  {
    provide: VertexDITokens.CreateVertexUseCase,
    useFactory: (userRepository) => new CreateVertexService(userRepository),
    inject: [VertexDITokens.VertexRepository],
  },
  {
    provide: VertexDITokens.GetVertexUseCase,
    useFactory: (vertexRepository) => new GetVertexService(vertexRepository),
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
