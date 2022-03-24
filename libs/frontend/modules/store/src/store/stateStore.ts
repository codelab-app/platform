import { ModalStore } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  ExtendedModel,
  Model,
  model,
  modelClass,
  modelFlow,
  prop,
  Ref,
  transaction,
} from 'mobx-keystone'
import { CreateStoreInput, UpdateStoreInput } from '../use-cases'
import { makeCreateInput, makeUpdateInput } from './apiUtils'
import { storeApi } from './storeApi'
import { StoreModel } from './StoreModel'
import { StoreTree } from './StoreTree'

@model('codelab/StateStore')
export class StateStore extends Model({
  storesTree: prop(() => new StoreTree({})),

  createModal: prop(() => new StoreModalStore({})),
  updateModal: prop(() => new StoreModalStore({})),
  deleteModal: prop(() => new StoresModalStore({})),
  selectedStores: prop(() => Array<Ref<StoreModel>>()).withSetter(),
}) {
  @modelFlow
  @transaction
  getTree = _async(function* (this: StateStore) {
    const { storesGraphs } = yield* _await(storeApi.GetStoresGraphs())
    this.storesTree.updateFromFragment(storesGraphs)
  })

  @modelFlow
  @transaction
  createStore = _async(function* (this: StateStore, input: CreateStoreInput) {
    const { createStores } = yield* _await(
      storeApi.CreateStores({ input: makeCreateInput(input) }),
    )

    if (!createStores.stores[0]) {
      throw new Error('No stores created')
    }

    this.storesTree.addNode(StoreModel.fromFragment(createStores.stores[0]))
  })

  @modelFlow
  @transaction
  updateStore = _async(function* (
    this: StateStore,
    store: StoreModel,
    input: UpdateStoreInput,
  ) {
    const { updateStores } = yield* _await(
      storeApi.UpdateStores({
        where: { id: store.id },
        update: makeUpdateInput(input),
      }),
    )

    return updateStores
  })

  @modelFlow
  @transaction
  deleteStoresSubgraph = _async(function* (this: StateStore, storeId: string) {
    const root = this.storesTree.node(storeId)

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

@model('codelab/StoreModalStore')
class StoreModalStore extends ExtendedModel(() => ({
  baseModel: modelClass<ModalStore<Ref<StoreModel>>>(ModalStore),
  props: {},
})) {
  @computed
  get store() {
    return this.metadata?.current ?? null
  }
}

@model('codelab/StoresModalStore')
class StoresModalStore extends ExtendedModel(() => ({
  baseModel: modelClass<ModalStore<Array<Ref<StoreModel>>>>(ModalStore),
  props: {},
})) {
  @computed
  get stores() {
    return this.metadata?.map((a) => a.current) ?? null
  }
}
