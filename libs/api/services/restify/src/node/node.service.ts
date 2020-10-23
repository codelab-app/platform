import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateNodeDto } from './dto/create-node.dto'
import { Node } from './node.schema'

@Injectable()
export class NodeService {
  constructor(@InjectModel(Node.name) private NodeModel: Model<Node>) {}

  async create(createNodeDto: CreateNodeDto): Promise<Node> {
    const createdCat = new this.NodeModel(createNodeDto)

    return createdCat.save()
  }

  async findAll(): Promise<Array<Node>> {
    return this.NodeModel.find().exec()
  }
}
