import { getTypeService } from '@codelab/frontend/modules/type'
import { StoreWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreateStoreDTO,
  IStoreDTO,
  IUpdateStoreDTO,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
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
import { storeRef } from '.'
import { getActionService } from './action.service'
import { makeStoreCreateInput, makeStoreUpdateInput } from './api.utils'
import { storeApi } from './store.api'
import { Store } from './store.model'
import { StoreModalService } from './store-modal.service'

export type WithStoreService = {
  storeService: StoreService
}
@model('codelab/StoreService')
export class StoreService extends Model({
  stores: prop(() => objectMap<Store>()),

  createModal: prop(() => new StoreModalService({})),
  updateModal: prop(() => new StoreModalService({})),
  deleteModal: prop(() => new StoreModalService({})),
}) {
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
  async ensureAllStateInterfacesAdded(state: Array<IStoreDTO['state']>) {
    // loading state interface within store fragment is hard so we load it separately
    return await getTypeService(this).getAll(state.map((x) => x.id))
  }

  @modelAction
  ensureAllActionsAdded(actions: IStoreDTO['actions']) {
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

    yield* _await(this.ensureAllStateInterfacesAdded(states))
    this.ensureAllActionsAdded(actions)

    const descendants = stores.flatMap((x) => x.descendants)

    descendants.concat(stores).forEach((store) => {
      this.stores.set(store.id, Store.fromFragment(store))
    })

    return this.stores
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
  createStore = _async(function* (
    this: StoreService,
    input: ICreateStoreDTO,
    ownerId: Nullish<string>,
  ) {
    if (!ownerId) {
      throw new Error('No owner id not provided')
    }

    const {
      createStores: {
        stores: [createdStore],
      },
    } = yield* _await(
      storeApi.CreateStores({ input: makeStoreCreateInput(input, ownerId) }),
    )

    if (!createdStore) {
      throw new Error('No stores created')
    }

    const store = Store.fromFragment(createdStore)

    this.addStore(store)
    this.attachToParent(store)

    return createdStore
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
  updateStore = _async(function* (
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

    const updatedStore = updateStores.stores[0]
    const storeModel = Store.fromFragment(updatedStore)

    this.detachFromParent(store) // detach from old parent
    this.attachToParent(storeModel) // attach to new parent

    this.stores.set(updatedStore.id, storeModel)

    return storeModel
  })

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
