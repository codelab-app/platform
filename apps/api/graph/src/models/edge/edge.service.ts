import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EdgeEntity } from './edge.entity'

@Injectable()
export class EdgeService {
  constructor(
    @InjectRepository(EdgeEntity)
    private readonly edgeRepository: Repository<EdgeEntity>,
  ) {}

  async findAll(): Promise<Array<EdgeEntity>> {
    return this.edgeRepository.find()
  }
}
