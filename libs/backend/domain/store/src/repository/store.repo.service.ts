import type { INodeType, IStoreDto } from '@codelab/shared/abstract/core'
import type { StoreOptions, StoreWhere } from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { StoreFragment } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/typebox'
import { storeApi, storeMapper } from '@codelab/shared-domain-module/store'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StoreRepository extends AbstractRepository<
  INodeType.Store,
  IStoreDto,
  StoreFragment,
  StoreWhere,
  StoreOptions
> {
  constructor(

    protected override loggerService: PinoLoggerService,
  ) {
    super(loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(stores: Array<IStoreDto>) {
    const {
      createStores: { stores: createdStores },
    } = await storeApi().CreateStores({
      input: stores.map((store) => storeMapper.toCreateInput(store)),
    })

    return createdStores
  }

  protected async _find({
    options,
    where,
  }: {
    where?: StoreWhere
    options?: StoreOptions
  }) {
    const { items } = await storeApi().GetStores({
      options,
      where,
    })

    return items
  }

  protected async _update(store: IStoreDto, where: StoreWhere) {
    const {
      updateStores: { stores },
    } = await storeApi().UpdateStores({
      update: storeMapper.toUpdateInput(store),
      where,
    })

    return stores[0]
  }
}
