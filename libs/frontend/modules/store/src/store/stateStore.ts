import { ModalStore } from '@codelab/frontend/shared/utils'
import { StoreCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  detach,
  ExtendedModel,
  idProp,
  Model,
  model,
  modelClass,
  modelFlow,
  ObjectMap,
  objectMap,
  prop,
  Ref,
  rootRef,
  transaction,
} from 'mobx-keystone'
import {
  StoreEdgeFragment,
  StoreFragment,
  StoreGraphFragment,
} from '../graphql/Store.fragment.v2.1.graphql.gen'
import type { CreateStoreInput, UpdateStoreInput } from '../use-cases'
import { storeApi } from './storeApi'

@model('codelab/Store')
export class StoreModel extends Model({
  id: idProp,
  name: prop<string>(),
  parentStore: prop<Maybe<Ref<StoreModel>>>(),
  parentStoreKey: prop<Maybe<string>>(),
}) {
  @modelFlow
  @transaction
  update = _async(function* (this: StoreModel, { name }: UpdateStoreInput) {
    this.name = name

    const { updateStores } = yield* _await(
      storeApi.UpdateStores({
        update: { name },
        where: { id: this.id },
      }),
    )

    const store = updateStores?.stores[0]

    if (!store) {
      throw new Error('Failed to update store')
    }

    this.name = store.name

    return StoreModel.fromFragment(store)
  })

  static fromFragment(store: StoreFragment): StoreModel {
    return new StoreModel({
      id: store.id,
      name: store.name,
      parentStore: store.parentStore?.id
        ? storeRef(store.parentStore?.id)
        : undefined,
      parentStoreKey: store.parentStoreConnection?.edges?.[0]?.storeKey,
    })
  }
}

export const storeRef = rootRef<StoreModel>('StoreRef', {
  onResolvedValueChange(ref, newStore, oldStore) {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})

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
@model('codelab/StoreEdgeModel')
class StoreEdgeModel extends Model({
  source: prop<string>(),
  target: prop<string>(),
  storeKey: prop<string>(),
}) {
  static fromFragment(edge: StoreEdgeFragment) {
    return new StoreEdgeModel({
      source: edge.source,
      target: edge.target,
      storeKey: edge.storeKey,
    })
  }
}

@model('codelab/StoresGraphsStore')
class StoresGraphsStore extends Model({
  vertices: prop(() => objectMap<StoreModel>()),
  edges: prop(() => Array<StoreEdgeModel>()),
}) {
  static fromFragment({ edges, vertices }: StoreGraphFragment) {
    return new StoresGraphsStore({
      edges: edges.map(StoreEdgeModel.fromFragment),
      vertices: new ObjectMap({
        items: vertices.map(StoreModel.fromFragment),
      }),
    })
  }
}

@model('codelab/StateStore')
export class StateStore extends Model({
  storesGraphs: prop(() => new StoresGraphsStore({})),
  createModal: prop(() => new ModalStore({})),
  updateModal: prop(() => new StoreModalStore({})),
  deleteModal: prop(() => new StoresModalStore({})),
  selectedStores: prop(() => Array<Ref<StoreModel>>()).withSetter(),
}) {
  store(id: string) {
    return this.storesGraphs.vertices.get(id)
  }

  @modelFlow
  @transaction
  getStoresGraphs = _async(function* (this: StateStore) {
    const { storesGraphs } = yield* _await(storeApi.GetStoresGraphs())
    this.storesGraphs = StoresGraphsStore.fromFragment(storesGraphs)

    return this.storesGraphs
  })

  @modelFlow
  @transaction
  createStore = _async(function* (
    this: StateStore,
    formInput: CreateStoreInput,
    ownerId: Nullish<string>,
  ) {
    const { name, parentStore } = formInput

    const input: StoreCreateInput = {
      name: name,
      parentStore: parentStore
        ? {
            connect: {
              where: { node: { id: parentStore.id } },
              edge: { storeKey: parentStore.key },
            },
          }
        : undefined,
    }

    const { createStores } = yield* _await(storeApi.CreateStores({ input }))
    const store = createStores.stores[0]

    if (!store) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Store was not created')
    }

    this.getStoresGraphs()

    const storeModel = StoreModel.fromFragment(store)

    return storeModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: StateStore, ids: Array<string>) {
    for (const id of ids) {
      if (this.storesGraphs.vertices.has(id)) {
        this.storesGraphs.vertices.delete(id)
      }
    }

    const { deleteStores } = yield* _await(
      storeApi.DeleteStores({ where: { id_IN: ids } }),
    )

    if (deleteStores.nodesDeleted === 0) {
      // throw error so that the storeic middleware rolls back the changes
      throw new Error('Store was not deleted')
    }

    this.getStoresGraphs()

    return deleteStores
  })
}
