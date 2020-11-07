import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { VertexEntity } from './vertex.entity'

@Injectable()
export class VertexService {
  constructor(
    @InjectRepository(VertexEntity)
    private readonly vertexRepository: Repository<VertexEntity>,
  ) {}

  async findAll(): Promise<Array<VertexEntity>> {
    return this.vertexRepository.find()
  }
}
