import { Module } from '@nestjs/common'
import { GraphService } from './graph.service'

@Module({
  providers: [GraphService],
})
export class GraphModule {}
