import { ModalStore } from '@codelab/frontend/shared/utils'
import {
  StoreCreateInput,
  StoreWhere,
} from '@codelab/shared/abstract/codegen-v2'
import { Maybe } from '@codelab/shared/abstract/types'
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
import type { CreateStoreInput, UpdateStoreInput } from '../use-cases/stores'
import { storeApi } from './storeApi'

@model('codelab/StoreModel')
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

@model('codelab/StoresGraphsModel')
class StoresGraphsModel extends Model({
  vertices: prop(() => objectMap<StoreModel>()),
  edges: prop(() => Array<StoreEdgeModel>()),
}) {
  static fromFragment({ edges, vertices }: StoreGraphFragment) {
    return new StoresGraphsModel({
      edges: edges.map(StoreEdgeModel.fromFragment),
      vertices: new ObjectMap({
        items: vertices.map(StoreModel.fromFragment),
      }),
    })
  }
}

@model('codelab/StateStore')
export class StateStore extends Model({
  stores: prop(() => objectMap<StoreModel>()),
  storesGraphs: prop(() => new StoresGraphsModel({})),
  createModal: prop(() => new ModalStore({})),
  updateModal: prop(() => new StoreModalStore({})),
  deleteModal: prop(() => new StoresModalStore({})),
  selectedStores: prop(() => Array<Ref<StoreModel>>()).withSetter(),
}) {
  @computed
  get atomsList() {
    return [...this.stores.values()]
  }

  store(id: string) {
    return this.stores.get(id) || this.storesGraphs.vertices.get(id)
  }

  @modelFlow
  @transaction
  getStoresGraphs = _async(function* (this: StateStore) {
    const { storesGraphs } = yield* _await(storeApi.GetStoresGraphs())
    this.storesGraphs = StoresGraphsModel.fromFragment(storesGraphs)

    return this.storesGraphs
  })

  @modelFlow
  @transaction
  createStore = _async(function* (
    this: StateStore,
    formInput: CreateStoreInput,
  ) {
    const { name, parentStore } = formInput

    const input: StoreCreateInput = {
      name: name,
      actions: { create: [] },
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
  getAll = _async(function* (this: StateStore, where?: StoreWhere) {
    const { stores } = yield* _await(storeApi.GetStores({ where }))

    return stores.map((store) => {
      if (this.stores.get(store.id)) {
        return this.stores.get(store.id)
      } else {
        const storeModel = StoreModel.fromFragment(store)
        this.stores.set(store.id, storeModel)

        return storeModel
      }
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: StateStore, id: string) {
    if (this.stores.has(id)) {
      return this.stores.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
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
