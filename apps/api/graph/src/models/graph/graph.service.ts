import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GraphEntity } from './graph.entity'

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(GraphEntity)
    private readonly graphEntityRepository: Repository<GraphEntity>,
  ) {}

  async findAll(): Promise<Array<GraphEntity>> {
    return this.graphEntityRepository.find()
  }
}
