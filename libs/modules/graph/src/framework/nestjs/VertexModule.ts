import { Module } from '@nestjs/common'
import { VertexService } from '../../core/application/services/VertexService'
import { DeleteNodeService } from '../../core/application/useCases/deleteNode/DeleteNodeService'
import { GetVertexService } from '../../core/application/useCases/getVertex/GetVertexService'
import { UpdateNodeService } from '../../core/application/useCases/updateNode/UpdateNodeService'
import { VertexResolvers } from '../../presentation/controllers/VertexResolvers'
import { PrismaService } from '@codelab/backend'

@Module({
  providers: [
    PrismaService,
    VertexService,
    VertexResolvers,
    /**
     * UseCaseProviders
     */
    GetVertexService,
    DeleteNodeService,
    UpdateNodeService,
  ],
  exports: [VertexService],
})
export class VertexModule {}
