import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
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

  async findByTargetIds(id1: string, id2: string): Promise<Array<EdgeEntity>> {
    return this.edgeRepository.find({
      where: [{ target: In([id1, id2]) }],
      relations: ['graph'],
    })
  }
}
