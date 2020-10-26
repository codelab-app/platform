import { Module } from '@nestjs/common'
import { NodesResolver, PropsResolver } from './resolvers'

@Module({
  providers: [PropsResolver, NodesResolver],
})
export class GraphqlPropsModule {}
