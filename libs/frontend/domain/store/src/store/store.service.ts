import type {
  ICreateStoreData,
  IInterfaceType,
  IStore,
  IStoreService,
  IUpdateStoreData,
} from '@codelab/frontend/abstract/core'
import {
  actionRef,
  componentRef,
  pageRef,
  storeRef,
  typeRef,
} from '@codelab/frontend/abstract/core'
import { getTypeService } from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import type {
  StoreFragment,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import { IStoreDTO } from '@codelab/shared/abstract/core'
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
    stores: prop(() => objectMap<IStore>()),
    updateModal: prop(() => new StoreModalService({})),
  })
  implements IStoreService
{
  @computed
  get actionService() {
    return getActionService(this)
  }

  @computed
  get typeService() {
    return getTypeService(this)
  }

  @computed
  get storesList() {
    return [...this.stores.values()]
  }

  store(id: string) {
    return this.stores.get(id)
  }

  @modelAction
  add({ actions, api, component, id, name, page, source }: IStoreDTO) {
    const store = new Store({
      actions: actions?.map((action) => actionRef(action.id)) || [],
      api: typeRef(api.id) as Ref<IInterfaceType>,
      component: component ? componentRef(component.id) : null,
      id,
      name,
      page: page ? pageRef(page.id) : null,
      source: source ? storeRef(source.id) : null,
    })

    this.stores.set(store.id, store)

    return store
  }

  @modelAction
  load = (stores: Array<StoreFragment>) => {
    this.actionService.load(stores.flatMap((store) => store.actions))
    this.typeService.loadTypes({
      interfaceTypes: stores.map((store) => store.api),
    })

    return stores.map((store) => this.add({ ...store, source: null }))
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: StoreService, where: StoreWhere) {
    const { items: stores } = yield* _await(this.storeRepository.find(where))

    return this.load(stores)
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: StoreService, id: string) {
    const [store] = yield* _await(this.getAll({ id }))

    return store
  })

  @modelFlow
  @transaction
  create = _async(function* (this: StoreService, data: ICreateStoreData) {
    const store = this.add(data)

    yield* _await(this.storeRepository.add(store))

    return store
  })

  @modelFlow
  @transaction
  update = _async(function* (this: StoreService, data: IUpdateStoreData) {
    const store = this.stores.get(data.id)!

    store.writeCache({ name: data.name })

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
