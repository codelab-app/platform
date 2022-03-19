import { ModalStore } from '@codelab/frontend/shared/utils'
import { StoreWhere } from '@codelab/shared/abstract/codegen-v2'
import { Nullish } from '@codelab/shared/abstract/types'
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
  objectMap,
  prop,
  Ref,
  rootRef,
  transaction,
} from 'mobx-keystone'
import { StoreFragment } from '../graphql/Store.fragment.v2.1.graphql.gen'
import type { CreateStoreInput, UpdateStoreInput } from '../use-cases'
import { storeApi } from './storeApi'

@model('codelab/Store')
export class StoreModel extends Model({
  id: idProp,
  name: prop<string>(),
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

  static fromFragment(store: StoreFragment) {
    return new StoreModel({
      id: store.id,
      name: store.name,
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

@model('codelab/StateStore')
export class StateStore extends Model({
  stores: prop(() => objectMap<StoreModel>()),
  createModal: prop(() => new ModalStore({})),
  updateModal: prop(() => new StoreModalStore({})),
  deleteModal: prop(() => new StoresModalStore({})),
  selectedStores: prop(() => Array<Ref<StoreModel>>()).withSetter(),
}) {
  @computed
  get storesList() {
    return [...this.stores.values()]
  }

  store(id: string) {
    return this.stores.get(id)
  }

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
  createStore = _async(function* (
    this: StateStore,
    input: CreateStoreInput,
    ownerId: Nullish<string>,
  ) {
    const {
      createStores: { stores },
    } = yield* _await(
      storeApi.CreateStores({
        input: { name: input.name },
      }),
    )

    const store = stores[0]

    if (!store) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Store was not created')
    }

    const storeModel = StoreModel.fromFragment(store)

    this.stores.set(storeModel.id, storeModel)

    return storeModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: StateStore, ids: Array<string>) {
    for (const id of ids) {
      if (this.stores.has(id)) {
        this.stores.delete(id)
      }
    }

    const { deleteStores } = yield* _await(
      storeApi.DeleteStores({ where: { id_IN: ids } }),
    )

    if (deleteStores.nodesDeleted === 0) {
      // throw error so that the storeic middleware rolls back the changes
      throw new Error('Store was not deleted')
    }

    return deleteStores
  })
}
