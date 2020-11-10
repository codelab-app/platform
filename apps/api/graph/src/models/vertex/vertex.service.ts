import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { classToPlain } from 'class-transformer'
import { DeleteResult, Repository } from 'typeorm'
import { VertexEntity } from './vertex.entity'
import { CreateVertexDTO, DeleteVertexDTO } from './vertex.interface'
@Injectable()
export class VertexService {
  constructor(
    @InjectRepository(VertexEntity)
    private readonly vertexRepository: Repository<VertexEntity>,
    private readonly Vertex: VertexEntity,
  ) {}

  async findAll(): Promise<Array<VertexEntity>> {
    return this.vertexRepository.find()
  }

  async create(createVertexDto: CreateVertexDTO): Promise<VertexEntity> {
    return this.vertexRepository.create(createVertexDto)
  }

  async delete(deleteVertexDto: DeleteVertexDTO): Promise<DeleteResult> {
    return this.vertexRepository.delete(deleteVertexDto)
  }

  schema() {
    console.log(typeof this.Vertex.id)
    const vertex = classToPlain(this.Vertex)

    console.log(vertex)

    return vertex
  }
}
