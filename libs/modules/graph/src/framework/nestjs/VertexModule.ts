import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { TypeOrmVertexRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmVertexRepositoryAdapter'
import { VertexDITokens } from '../VertexDITokens'

export const persistenceProviders: Array<Provider> = [
  {
    provide: VertexDITokens.VertexRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmVertexRepositoryAdapter),
    inject: [Connection],
  },
]

export const handlerProviders: Array<Provider> = []

const useCaseProviders: Array<Provider> = []

@Module({
  imports: [CqrsModule],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
  controllers: [],
})
export class VertexModule {}
