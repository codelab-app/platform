import type {
  IInterfaceTypeCreateDto,
  IStoreDto,
} from '@codelab/shared/abstract/core'

import { StoreDomainService } from '@codelab/backend/domain/store'
import { TypeDomainService } from '@codelab/backend/domain/type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StoreApplicationService {
  constructor(
    private typeDomainService: TypeDomainService,
    private storeDomainService: StoreDomainService,
  ) {}

  async createStoreAggregate(
    storeDto: IStoreDto,
    interfaceTypeDto: IInterfaceTypeCreateDto,
  ) {
    const api = await this.typeDomainService.createInterface(interfaceTypeDto)
    const store = await this.storeDomainService.create(storeDto)

    return store
  }
}
