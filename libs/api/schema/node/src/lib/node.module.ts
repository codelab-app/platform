import { Module } from '@nestjs/common'
import { NodeResolver } from './node-resolvers'
@Module({
  imports: [],
  providers: [NodeResolver],
})
export class NodeModule {}
