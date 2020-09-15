import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Node, NodeSchema } from './node.schema'
import { NodeService } from './node.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
  ],
  exports: [MongooseModule],
  providers: [NodeService],
})
export class NodeModule {}
