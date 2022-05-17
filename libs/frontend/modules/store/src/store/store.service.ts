import { getResourceService } from '@codelab/frontend/modules/resource'
import { getTypeService } from '@codelab/frontend/modules/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import { StoreWhere } from '@codelab/shared/abstract/codegen'
import {
  IActionDTO,
  IAddStoreResourceDTO,
  ICreateStoreDTO,
  IResourceDTO,
  IStoreDTO,
  IStoreService,
  IUpdateStoreDTO,
} from '@codelab/shared/abstract/core'
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
import { getActionService } from './action.service'
import {
  makeAddResourceInput,
  makeRemoveResourceInput,
  makeStoreCreateInput,
  makeStoreUpdateInput,
} from './api.utils'
import { storeApi } from './store.api'
import { Store, storeRef } from './store.model'
import { StoreModalService } from './store-modal.service'

@model('@codelab/StoreService')
export class StoreService
  extends Model({
    stores: prop(() => objectMap<Store>()),

    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new StoreModalService({})),
    deleteModal: prop(() => new StoreModalService({})),
  })
  implements IStoreService
{
  @computed
  get antdTree() {
    return [...this.stores.values()]
      .filter((s) => s.isRoot)
      .map((s) => s.toTreeNode())
  }

  store(id: string) {
    return this.stores.get(id)
  }

  @modelAction
  async fetchStates(state: Array<IStoreDTO['state']>) {
    // loading state interface within store fragment is hard so we load it separately
    return await getTypeService(this).getAllWithDescendants(
      state.map((x) => x.id),
    )
  }

  @modelAction
  fetchResources(resources: Array<IResourceDTO>) {
    // loading state interface within store fragment is hard so we load it separately
    getResourceService(this).updateCache(resources)
  }

  @modelAction
  fetchActions(actions: Array<IActionDTO>) {
    getActionService(this).updateCache(actions)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: StoreService, where?: StoreWhere) {
    this.stores.clear()

    const { stores } = yield* _await(
      storeApi.GetStores({
        where: {
          // query only root stores and the reset will be descendants
          parentStoreAggregate: { count: 0 },
          AND: where ? [where] : [],
        },
      }),
    )

    const states = stores.map((x) => x.state)
    const actions = stores.flatMap((x) => x.actions)
    const resources = stores.flatMap((x) => x.resources)

    yield* _await(this.fetchStates(states))
    this.fetchActions(actions)
    this.fetchResources(resources)

    const descendants = stores.flatMap((x) => x.descendants)

    descendants.concat(stores).forEach((store) => {
      this.stores.set(store.id, Store.hydrate(store))
    })

    return [...this.stores.values()]
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: StoreService, id: string) {
    if (!this.stores.has(id)) {
      yield* _await(this.getAll({ id }))
    }

    return this.stores.get(id)
  })

  @modelAction
  addStore(store: Store) {
    this.stores.set(store.id, store)
  }

  @modelAction
  attachToParent(store: Store) {
    if (!store.parentStore?.id) {
      return
    }

    this.store(store.parentStore?.id)?.children.push(storeRef(store))
  }

  @modelFlow
  @transaction
  create = _async(function* (this: StoreService, data: Array<ICreateStoreDTO>) {
    const input = data.map((store) => makeStoreCreateInput(store))

    const {
      createStores: { stores },
    } = yield* _await(storeApi.CreateStores({ input }))

    if (!stores.length) {
      throw new Error('No stores created')
    }

    return stores.map((store) => {
      const storeModel = Store.hydrate(store)

      this.addStore(storeModel)
      this.attachToParent(storeModel)

      return storeModel
    })
  })

  @modelAction
  detachFromParent(store: Store) {
    if (!store.parentStore?.id) {
      return
    }

    const oldParent = this.store(store.parentStore?.id)

    const oldRefIndex = oldParent?.children.findIndex(
      (x) => x.current.id === store.id,
    ) as number

    oldParent?.children.splice(oldRefIndex, 1)
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: StoreService,
    store: Store,
    input: IUpdateStoreDTO,
  ) {
    const { updateStores } = yield* _await(
      storeApi.UpdateStores({
        where: { id: store.id },
        update: makeStoreUpdateInput(input),
      }),
    )

    return this.afterStoreUpdate(updateStores.stores, store)
  })

  @modelFlow
  @transaction
  addResource = _async(function* (
    this: StoreService,
    store: Store,
    input: IAddStoreResourceDTO,
  ) {
    const { updateStores } = yield* _await(
      storeApi.UpdateStores({
        where: { id: store.id },
        update: makeAddResourceInput(input),
      }),
    )

    return this.afterStoreUpdate(updateStores.stores, store)
  })

  @modelFlow
  @transaction
  removeResource = _async(function* (
    this: StoreService,
    store: Store,
    resourceId: string,
  ) {
    const { updateStores } = yield* _await(
      storeApi.UpdateStores({
        where: { id: store.id },
        update: makeRemoveResourceInput(resourceId),
      }),
    )

    return this.afterStoreUpdate(updateStores.stores, store)
  })

  afterStoreUpdate(stores: Array<IStoreDTO>, store: Store) {
    const updatedStore = stores[0]
    const storeModel = Store.hydrate(updatedStore)

    // detach from old parent
    this.detachFromParent(store)
    // attach to new parent
    this.attachToParent(storeModel)

    this.stores.set(updatedStore.id, storeModel)

    return storeModel
  }

  @modelAction
  removeStoreAndDescendants(store: Store) {
    store.children.forEach((child) =>
      this.removeStoreAndDescendants(child.current),
    )
    this.stores.delete(store.id)
  }

  @modelFlow
  @transaction
  deleteStoresSubgraph = _async(function* (
    this: StoreService,
    storeId: string,
  ) {
    const root = this.store(storeId)

    if (!root) {
      throw new Error('Deleted store not found')
    }

    this.removeStoreAndDescendants(root)

    const { deleteStoresSubgraph } = yield* _await(
      storeApi.DeleteStoresSubgraph({ where: { id: storeId } }),
    )

    const { nodesDeleted } = deleteStoresSubgraph

    if (nodesDeleted === 0) {
      throw new Error('No stores deleted')
    }

    return root
  })
}
