import { Module } from '@nestjs/common'
import { NodeResolvers } from './node.resolvers'

@Module({
  imports: [],
  providers: [NodeResolvers],
  exports: [],
})
export class GraphqlNodeModule {}
