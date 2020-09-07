import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Node } from './node.schema'
import { CreateNodeDto } from './dto/create-node.dto'

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
