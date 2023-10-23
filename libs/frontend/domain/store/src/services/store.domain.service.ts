import type {
  IStoreDomainService,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import { IStoreDTO } from '@codelab/shared/abstract/core'
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
  hydrate(storeDTO: IStoreDTO) {
    let store = this.stores.get(storeDTO.id)

    if (store) {
      store.writeCache(storeDTO)
    } else {
      store = Store.create(storeDTO)

      this.stores.set(store.id, store)
    }

    return store
  }
}
