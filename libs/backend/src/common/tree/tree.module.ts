import { Module } from '@nestjs/common'
import { TreeService } from './tree.service'

@Module({
  providers: [TreeService],
  exports: [TreeService],
})
export class TreeModule {}
