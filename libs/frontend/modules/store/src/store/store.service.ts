import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { CreateStoreInput, UpdateStoreInput } from '../use-cases'
import { makeStoreCreateInput, makeStoreUpdateInput } from './apiUtils'
import { Store } from './store.model'
import { StoreModalService } from './store-modal.service'
import { StoreTree } from './store-tree.service'
import { storeApi } from './storeApi'

export type WithStoreService = {
  storeService: StoreService
}
@model('codelab/StoreService')
export class StoreService extends Model({
  storesTree: prop(() => new StoreTree({})),

  createModal: prop(() => new StoreModalService({})),
  updateModal: prop(() => new StoreModalService({})),
  deleteModal: prop(() => new StoreModalService({})),
}) {
  store(id: string): Store {
    return this.storesTree.node(id) as Store
  }

  @modelFlow
  @transaction
  getTree = _async(function* (this: StoreService) {
    const { storesGraphs } = yield* _await(storeApi.GetStoresGraphs({}))
    this.storesTree.updateFromFragment(storesGraphs)

    return this.storesTree.nodes
  })

  @modelFlow
  @transaction
  createStore = _async(function* (
    this: StoreService,
    input: CreateStoreInput,
    ownerId: string,
  ) {
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

    if (input.parentStore?.id) {
      this.storesTree.addChild(this.store(input.parentStore?.id), store, {
        source: input.parentStore.id,
        target: store.id,
        storeKey: input.parentStore.key,
      })
    }

    this.storesTree.addNode(store)

    return createdStore
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: StoreService, id: string) {
    if (this.storesTree.nodes.has(id)) {
      return this.storesTree.nodes.get(id)
    }

    const {
      stores: [store],
    } = yield* _await(storeApi.GetStores({ where: { id } }))

    if (!store) {
      throw new Error('Store not found')
    }

    this.storesTree.addNode(Store.fromFragment(store))

    return store
  })

  @modelFlow
  @transaction
  updateStore = _async(function* (
    this: StoreService,
    store: Store,
    input: UpdateStoreInput,
  ) {
    const { updateStores } = yield* _await(
      storeApi.UpdateStores({
        where: { id: store.id },
        update: makeStoreUpdateInput(input),
      }),
    )

    const updatedStore = updateStores.stores[0]
    const storeModel = Store.fromFragment(updatedStore)
    this.storesTree.nodes.set(updatedStore.id, storeModel)

    return storeModel
  })

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

    this.storesTree.removeNodeAndDescendants(root)

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
