import { Module } from '@nestjs/common'
import { UpdateEdgeService } from '../../core/application/useCases/updateEdge/UpdateEdgeService'
import { EdgeResolvers } from '../../presentation/controllers/EdgeResolvers'
import { PrismaService } from '@codelab/backend'

@Module({
  providers: [
    PrismaService,
    EdgeResolvers,
    /**
     * UseCaseProviders
     */
    UpdateEdgeService,
  ],
})
export class EdgeModule {}
