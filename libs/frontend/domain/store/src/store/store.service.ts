import type {
  ICreateStoreData,
  IInterfaceType,
  IStore,
  IStoreService,
  IUpdateStoreData,
} from '@codelab/frontend/abstract/core'
import { IStoreDTO } from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { StoreWhere } from '@codelab/shared/abstract/codegen'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
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
import { StoreRepository } from '../services/store.repository'
import { getActionService } from './action.service'
import { actionRef, Store } from './models'
import { StoreModalService } from './store-modal.service'

@model('@codelab/StoreService')
export class StoreService
  extends Model({
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new StoreModalService({})),
    storeRepository: prop(() => new StoreRepository({})),
    stores: prop(() => objectMap<IStore>()),
    updateModal: prop(() => new StoreModalService({})),
  })
  implements IStoreService
{
  store(id: string) {
    return this.stores.get(id)
  }

  @computed
  get storesList() {
    return [...this.stores.values()]
  }

  @computed
  get actionService() {
    return getActionService(this)
  }

  @modelAction
  add({ id, name, api, actions }: IStoreDTO) {
    const store = new Store({
      actions: actions?.map((action) => actionRef(action.id)),
      api: typeRef(api.id) as Ref<IInterfaceType>,
      id,
      name,
    })

    this.stores.set(store.id, store)

    return store
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: StoreService, where: StoreWhere) {
    const stores = yield* _await(this.storeRepository.find(where))

    return stores.map((store) => {
      for (const action of store.actions) {
        /**
         * attach action to mobx tree before calling actionRef
         */
        const actionDTO =
          this.actionService.actionFactory.fromActionFragment(action)

        this.actionService.add(actionDTO)
      }

      return this.add(store)
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: StoreService, id: string) {
    const [store] = yield* _await(this.getAll({ id }))

    return store
  })

  @modelFlow
  @transaction
  create = _async(function* (this: StoreService, storeData: ICreateStoreData) {
    const store = this.add(storeData)

    yield* _await(this.storeRepository.add(store))

    return store
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: StoreService,
    { name, id }: IUpdateStoreData,
  ) {
    const store = this.stores.get(id)!

    store.writeCache({ name })

    yield* _await(this.storeRepository.update(store))

    return store
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: StoreService, store: IStore) {
    const { id } = store

    this.stores.delete(id)

    yield* _await(this.storeRepository.delete([store]))

    return store!
  })
}
