import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GraphEntity } from './graph.entity'
import { GraphObject } from './graph.object'

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(GraphEntity)
    private readonly graphEntityRepository: Repository<GraphEntity>,
  ) {}

  async findAll(): Promise<Array<GraphEntity>> {
    return this.graphEntityRepository.find()
  }

  async getGraphsForUser(userId: number) {
    const result = new GraphObject()
    const graphs: Array<GraphEntity> = await this.graphEntityRepository.find({
      where: { userId },
      relations: ['vertex', 'edge'],
    })

    result.vertices = []
    result.edges = []

    graphs.forEach((graph) => {
      if (graph.vertex) {
        result.vertices.push(graph.vertex)
      }
    })
    graphs.forEach((graph) => {
      if (graph.edge) {
        result.edges.push(graph.edge)
      }
    })

    return result
  }
}
