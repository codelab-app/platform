import type {
  IInterfaceTypeDto,
  IStoreAggregate,
  IStoreDto,
} from '@codelab/shared/abstract/core'

import { TypeApplicationService } from '@codelab/backend/application/type'
import { ActionFactory } from '@codelab/backend/domain/action'
import {
  StoreDomainService,
  StoreRepository,
} from '@codelab/backend/domain/store'
import { TypeDomainService } from '@codelab/backend/domain/type'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StoreApplicationService {
  constructor(
    private storeDomainService: StoreDomainService,
    private typeDomainService: TypeDomainService,
    private typeApplicationService: TypeApplicationService,
    private readonly storeRepository: StoreRepository,
    private readonly actionFactory: ActionFactory,
    private logger: PinoLoggerService,
  ) {}

  async addStores(storesAggregate: Array<IStoreAggregate>) {
    const actionsData = storesAggregate.flatMap(({ actions }) => actions)
    const apis = storesAggregate.flatMap(({ api }) => api)
    const stores = storesAggregate.map(({ store }) => store)

    await this.typeApplicationService.addApis(apis)

    for (const store of stores) {
      await this.storeRepository.add(store)
    }

    for (const action of actionsData) {
      await this.actionFactory.save(action)
    }
  }

  async createStoreAggregate(
    storeDto: IStoreDto,
    interfaceTypeDto: IInterfaceTypeDto,
  ) {
    await this.typeDomainService.createInterface(interfaceTypeDto)

    const store = await this.storeDomainService.create(storeDto)

    return store
  }

  async saveStore({ actions, api, store }: IStoreAggregate) {
    this.logger.log('Saving store')

    await this.typeApplicationService.saveApi(api)
    await this.storeRepository.save(store)

    await Promise.all(actions.map((action) => this.actionFactory.save(action)))
  }
}
