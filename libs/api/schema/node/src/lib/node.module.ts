import { Module } from '@nestjs/common'
import { NodeResolvers } from './node.resolvers'
@Module({
  imports: [],
  providers: [NodeResolvers],
})
export class NodeModule {}
