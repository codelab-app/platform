import { DgraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { SeederService } from './seeder.service'

@Module({
  imports: [DgraphModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
