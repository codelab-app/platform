import { getTypeService } from '@codelab/frontend/modules/type'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { StoreWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreateStoreDTO,
  IStore,
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
import { deleteStoreInput } from '../utils'
import { getActionService } from './action.service'
import { makeStoreCreateInput, storeApi } from './apis'
import { Store } from './models'
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
  store(id: string) {
    return this.stores.get(id)
  }

  @computed
  get storesList() {
    return [...this.stores.values()]
  }

  @modelAction
  private updateActionsCache(stores: Array<IStoreDTO>) {
    const actionService = getActionService(this)
    const actions = stores.flatMap((s) => s.actions)

    return actions.map((action) => actionService.writeCache(action))
  }

  @modelAction
  private async fetchStatesApis(stores: Array<IStoreDTO>) {
    const typeService = getTypeService(this)

    return await typeService.getAllWithDescendants(stores.map((x) => x.api.id))
  }

  @modelAction
  public writeCache = (store: IStoreDTO) => {
    const actionService = getActionService(this)

    store.actions.map((action) => actionService.writeCache(action))

    let storeModel = this.store(store.id)

    if (storeModel) {
      storeModel.writeCache(store)
    } else {
      storeModel = Store.hydrate(store)
      this.stores.set(store.id, storeModel)
    }

    return storeModel
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: StoreService, where?: StoreWhere) {
    const { stores } = yield* _await(storeApi.GetStores({ where }))

    return stores.map((store) => this.writeCache(store))
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: StoreService, id: string) {
    if (!this.stores.has(id)) {
      yield* _await(this.getAll({ id }))
    }

    return this.stores.get(id)
  })

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

    return stores.map((store) => this.writeCache(store))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: StoreService,
    store: IStore,
    { name }: IUpdateStoreDTO,
  ) {
    const { updateStores } = yield* _await(
      storeApi.UpdateStores({
        where: { id: store.id },
        update: { name },
      }),
    )

    const updatedStore = updateStores.stores[0]

    if (!updatedStore) {
      throw new Error('Failed to update store')
    }

    return store.writeCache(updatedStore)
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: StoreService, storeId: string) {
    const existing = throwIfUndefined(this.stores.get(storeId))

    if (!existing) {
      throw new Error('Deleted store not found')
    }

    const { deleteStores } = yield* _await(
      storeApi.DeleteStores({
        where: { id: storeId },
        delete: deleteStoreInput,
      }),
    )

    const { nodesDeleted } = deleteStores

    if (nodesDeleted === 0) {
      throw new Error('No stores deleted')
    }

    return existing
  })
}
