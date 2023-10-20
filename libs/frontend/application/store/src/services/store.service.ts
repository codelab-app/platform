import type { IStoreService } from '@codelab/frontend/abstract/application'
import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import { getTypeService } from '@codelab/frontend/application/type'
import { ModalService } from '@codelab/frontend/domain/shared'
import { StoreDomainService } from '@codelab/frontend/domain/store'
import type {
  StoreFragment,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { getActionService } from './action.service.context'
import { StoreRepository } from './store.repo'
import { StoreModalService } from './store-modal.service'

@model('@codelab/StoreService')
export class StoreService
  extends Model({
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new StoreModalService({})),
    storeDomainService: prop(() => new StoreDomainService({})),
    storeRepository: prop(() => new StoreRepository({})),
    updateModal: prop(() => new StoreModalService({})),
  })
  implements IStoreService
{
  @modelFlow
  @transaction
  create = _async(function* (this: StoreService, data: IStoreDTO) {
    const store = this.storeDomainService.add(data)

    yield* _await(this.storeRepository.add(store))

    return store
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: StoreService, stores: Array<IStoreModel>) {
    stores.forEach((store) => {
      this.storeDomainService.stores.delete(store.id)
    })

    yield* _await(this.storeRepository.delete(stores))

    return
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: StoreService, where: StoreWhere) {
    const { items: stores } = yield* _await(this.storeRepository.find(where))

    return this.load(stores)
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: StoreService, id: string) {
    if (this.storeDomainService.stores.has(id)) {
      return this.storeDomainService.stores.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  update = _async(function* (this: StoreService, data: IStoreDTO) {
    const store = this.storeDomainService.stores.get(data.id)!

    store.writeCache({ name: data.name })

    yield* _await(this.storeRepository.update(store))

    return store
  })

  @modelAction
  load = (stores: Array<StoreFragment>) => {
    console.debug('StoreService.load()', stores)
    this.actionService.load(stores.flatMap((store) => store.actions))

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (stores.some((store) => store?.api)) {
      this.typeService.loadTypes({
        interfaceTypes: stores.map((store) => store.api),
      })
    }

    return stores.map((store) =>
      this.storeDomainService.add({ ...store, source: null }),
    )
  }

  store(id: string) {
    return this.storeDomainService.stores.get(id)
  }

  @computed
  private get actionService() {
    return getActionService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }
}
