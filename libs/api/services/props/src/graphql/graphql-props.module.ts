import { Module } from '@nestjs/common'
import { GraphqlPropsService } from './graphql-props.service'
import { NodesResolver, PropsResolver } from './resolvers'

@Module({
  providers: [PropsResolver, NodesResolver, GraphqlPropsService],
})
export class GraphqlPropsModule {}
