import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PrismaEdgeRepositoryAdapter } from '../../infrastructure/persistence/PrismaEdgeRepositoryAdapter'
import { EdgeDITokens } from '../EdgeDITokens'
import { PrismaDITokens } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [
  {
    provide: EdgeDITokens.EdgeRepository,
    useFactory: (prismaService) =>
      new PrismaEdgeRepositoryAdapter(prismaService),
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
})
export class EdgeModule {}
