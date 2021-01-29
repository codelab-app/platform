import { Module } from '@nestjs/common'
import { EdgeResolvers } from '../../presentation/controllers/EdgeResolvers'
import { PrismaService } from '@codelab/backend'

@Module({
  providers: [PrismaService, EdgeResolvers],
})
export class EdgeModule {}
