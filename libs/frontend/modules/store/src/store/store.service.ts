import { getTypeService } from '@codelab/frontend/modules/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import { StoreWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreateStoreDTO,
  IStore,
  IStoreDTO,
  IStoreRef,
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
import { makeStoreCreateInput, makeStoreUpdateInput } from './api.utils'
import { storeApi } from './store.api'
import { Store, storeRef } from './store.model'
import { StoreModalService } from './store-modal.service'

@model('@codelab/StoreService')
export class StoreService
  extends Model({
    stores: prop(() => objectMap<IStore>()),

    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new StoreModalService({})),
    deleteModal: prop(() => new StoreModalService({})),
  })
  implements IStoreService
{
  /**
   * Used to load single store tree
   */
  @modelFlow
  getTree = _async(function* (this: StoreService, rootId: IStoreRef) {
    const { storeGraph } = yield* _await(
      storeApi.GetStoreGraph({ input: { rootId } }),
    )

    const ids = [storeGraph.id, ...storeGraph.descendants]

    const { stores } = yield* _await(
      storeApi.GetStores({
        where: {
          id_IN: ids,
        },
      }),
    )

    return yield* _await(this.hydrateOrUpdateCache(stores))
  })

  store(id: string) {
    return this.stores.get(id)
  }

  @computed
  get roots() {
    return [...this.stores.values()].filter((s) => s.isRoot)
  }

  @modelAction
  private updateActionsCache(stores: Array<IStoreDTO>) {
    const actionService = getActionService(this)
    const actions = stores.flatMap((s) => s.actions)

    return actionService.hydrateOrUpdateCache(actions)
  }

  @modelAction
  private async fetchStatesApis(stores: Array<IStoreDTO>) {
    const typeService = getTypeService(this)

    return await typeService.getAllWithDescendants(
      stores.map((x) => x.stateApi.id),
    )
  }

  @modelAction
  public hydrateOrUpdateCache = async (
    stores: Array<IStoreDTO>,
  ): Promise<Array<IStore>> => {
    this.updateActionsCache(stores)
    // it is very complex to load api with store fragment
    await this.fetchStatesApis(stores)

    return stores.map((store) => {
      if (this.stores.has(store.id)) {
        const storeModel = this.stores.get(store.id)!

        return storeModel.updateCache(store)
      }

      const storeModel = Store.hydrate(store)
      this.stores.set(store.id, storeModel)

      return storeModel
    })
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: StoreService, where?: StoreWhere) {
    const { stores } = yield* _await(storeApi.GetStores({ where }))

    return yield* _await(this.hydrateOrUpdateCache(stores))
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
  addStore(store: IStore) {
    this.stores.set(store.id, store)
  }

  @modelAction
  attachToParent(store: IStore) {
    if (!store.parentStore?.id) {
      return
    }

    this.store(store.parentStore?.id)?.children.set(store.id, storeRef(store))
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
  detachFromParent(store: IStore) {
    if (!store.parentStore?.id) {
      return
    }

    const oldParent = this.store(store.parentStore?.id)

    const oldRefIndex = oldParent?.childrenList.findIndex(
      (x) => x.id === store.id,
    ) as number

    oldParent?.childrenList.splice(oldRefIndex, 1)
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: StoreService,
    store: IStore,
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

  afterStoreUpdate(stores: Array<IStoreDTO>, store: IStore) {
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
  removeStoreAndDescendants(store: IStore) {
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

    const { deleteStores } = yield* _await(
      storeApi.DeleteStores({ where: { id: storeId } }),
    )

    const { nodesDeleted } = deleteStores

    if (nodesDeleted === 0) {
      throw new Error('No stores deleted')
    }

    return root
  })
}
