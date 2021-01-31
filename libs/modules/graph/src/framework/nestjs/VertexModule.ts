import { Module } from '@nestjs/common'
import { VertexService } from '../../core/application/services/VertexService'
import { DeleteVertexService } from '../../core/application/useCases/deleteVertex/DeleteVertexService'
import { GetVertexService } from '../../core/application/useCases/getVertex/GetVertexService'
import { MoveVertexService } from '../../core/application/useCases/moveVertex/MoveVertexService'
import { UpdateVertexService } from '../../core/application/useCases/updateVertex/UpdateVertexService'
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
    MoveVertexService,
    GetVertexService,
    DeleteVertexService,
    UpdateVertexService,
  ],
  exports: [VertexService],
})
export class VertexModule {}
