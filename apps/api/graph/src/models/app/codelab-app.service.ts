import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CodelabAppEntity } from './codelab-app.entity'

@Injectable()
export class CodelabAppService {
  constructor(
    @InjectRepository(CodelabAppEntity)
    private readonly codelabAppRepository: Repository<CodelabAppEntity>,
  ) {}

  async findAll(): Promise<Array<CodelabAppEntity>> {
    return this.codelabAppRepository.find()
  }
}
