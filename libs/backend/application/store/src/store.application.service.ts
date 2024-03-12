import { StoreDomainService } from '@codelab/backend/domain/store'
import { TypeDomainService } from '@codelab/backend/domain/type'
import type {
  ICreateInterfaceTypeDto,
  IStoreDto,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StoreApplicationService {
  constructor(
    private typeDomainService: TypeDomainService,
    private storeDomainService: StoreDomainService,
  ) {}

  async createStoreAggregate(
    storeDto: IStoreDto,
    interfaceTypeDto: ICreateInterfaceTypeDto,
  ) {
    const api = await this.typeDomainService.createInterface(interfaceTypeDto)
    const store = await this.storeDomainService.create(storeDto)

    return store
  }
}
