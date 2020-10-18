import { Module } from '@nestjs/common'
import { PropsService } from './props.service'
import { NodesResolver, PropsResolver } from './resolvers'

@Module({
  providers: [PropsResolver, NodesResolver, PropsService],
})
export class PropsModule {}
