import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { TypeOrmEdgeRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmEdgeRepositoryAdapter'
import { EdgeDITokens } from '../EdgeDITokens'

export const persistenceProviders: Array<Provider> = [
  {
    provide: EdgeDITokens.EdgeRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmEdgeRepositoryAdapter),
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
})
export class EdgeModule {}
