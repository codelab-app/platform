import type {
  IStoreModel,
  IStoreService,
} from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { getTypeService } from '@codelab/frontend/domain/type'
import type {
  StoreFragment,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import { IStoreDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { StoreRepository } from '../services/store.repo'
import { getActionService } from './action.service.context'
import { Store } from './models'
import { StoreModalService } from './store-modal.service'

@model('@codelab/StoreService')
export class StoreService
  extends Model({
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new StoreModalService({})),
    storeRepository: prop(() => new StoreRepository({})),
    stores: prop(() => objectMap<IStoreModel>()),
    updateModal: prop(() => new StoreModalService({})),
  })
  implements IStoreService
{
  @computed
  get storesList() {
    return [...this.stores.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (this: StoreService, data: IStoreDTO) {
    const store = this.add(data)

    yield* _await(this.storeRepository.add(store))

    return store
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: StoreService, stores: Array<IStoreModel>) {
    stores.forEach((store) => {
      this.stores.delete(store.id)
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
    if (this.stores.has(id)) {
      return this.stores.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  update = _async(function* (this: StoreService, data: IStoreDTO) {
    const store = this.stores.get(data.id)!

    store.writeCache({ name: data.name })

    yield* _await(this.storeRepository.update(store))

    return store
  })

  @modelAction
  add(storeDTO: IStoreDTO) {
    let store = this.stores.get(storeDTO.id)

    if (store) {
      store.writeCache(storeDTO)
    } else {
      store = Store.create(storeDTO)

      this.stores.set(store.id, store)
    }

    return store
  }

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

    return stores.map((store) => this.add({ ...store, source: null }))
  }

  store(id: string) {
    return this.stores.get(id)
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
