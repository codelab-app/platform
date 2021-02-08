import { Module } from '@nestjs/common'
import { UpdateEdgeService } from '../../core/application/useCases/updateEdge/UpdateEdgeService'
import { EdgeResolvers } from '../../presentation/controllers/EdgeResolvers'

@Module({
  providers: [
    EdgeResolvers,
    /**
     * UseCaseProviders
     */
    UpdateEdgeService,
  ],
})
export class EdgeModule {}
