import { Module } from '@nestjs/common'
import { AtomService } from './atom.service'

@Module({
  exports: [AtomService],
  providers: [AtomService],
})
export class AtomModule {}
