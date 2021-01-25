import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PrismaVertexRepositoryAdapter } from '../../infrastructure/persistence/PrismaVertexRepositoryAdapter'
import { VertexDITokens } from '../VertexDITokens'
import { PrismaDITokens } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [
  {
    provide: VertexDITokens.VertexRepository,
    useFactory: (prismaService) =>
      new PrismaVertexRepositoryAdapter(prismaService),
    inject: [PrismaDITokens.PrismaService],
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
