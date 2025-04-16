import type {
  IStoreDomainService,
  IStoreModel,
} from '@codelab/frontend-abstract-domain'
import type { IStoreDto } from '@codelab/shared-abstract-core'

import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'

import { Store } from '../store'

@model('@codelab/StoreDomainService')
export class StoreDomainService
  extends Model({
    stores: prop(() => objectMap<IStoreModel>()),
  })
  implements IStoreDomainService
{
  @computed
  get storesList() {
    return [...this.stores.values()]
  }

  @modelAction
  hydrate(storeDto: IStoreDto) {
    let store = this.stores.get(storeDto.id)

    if (store) {
      store.writeCache(storeDto)
    } else {
      store = Store.create(storeDto)

      this.stores.set(store.id, store)
    }

    return store
  }
}
