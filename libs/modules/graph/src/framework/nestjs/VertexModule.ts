import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { TypeOrmVertexRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmVertexRepositoryAdapter'
import { VertexDITokens } from '../VertexDITokens'
import { TypeOrmVertex } from '@codelab/backend'

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
  imports: [CqrsModule, TypeOrmModule.forFeature([TypeOrmVertex])],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
  controllers: [],
})
export class VertexModule {}
