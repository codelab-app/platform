import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { NodeSchema, Node } from './node.schema'
import { NodeService } from './node.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
  ],
  exports: [MongooseModule],
  providers: [NodeService],
})
export class NodeModule {}
