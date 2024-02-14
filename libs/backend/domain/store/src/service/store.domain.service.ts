import type { IStoreDto } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { StoreRepository } from '../repository'

@Injectable()
export class StoreDomainService {
  constructor(private storeRepository: StoreRepository) {}

  async create(dto: Pick<IStoreDto, 'api' | 'id' | 'name'>) {
    return this.storeRepository.add(dto)
  }
}
