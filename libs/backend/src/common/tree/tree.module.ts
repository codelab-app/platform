import { Module } from '@nestjs/common'
import { TreeService } from './tree.service'

@Module({
  providers: [TreeService],
})
export class TreeModule {}
