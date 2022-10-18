import {
  ICreateStoreDTO,
  IStore,
  IStoreDTO,
  IStoreService,
  IUpdateStoreDTO,
} from '@codelab/frontend/abstract/core'
import { getTypeService } from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import { StoreWhere } from '@codelab/shared/abstract/codegen'
import { IEntity } from '@codelab/shared/abstract/types'
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
  @computed
  private get typeService() {
    return getTypeService(this)
  }

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
    return await this.typeService.getAllWithDescendants(
      stores.map((x) => x.api.id),
    )
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

    return stores.map((store) => this.writeCache(store))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: StoreService,
    { id }: IEntity,
    { name }: IUpdateStoreDTO,
  ) {
    const {
      updateStores: { stores },
    } = yield* _await(
      storeApi.UpdateStores({
        where: { id },
        update: { name },
      }),
    )

    return stores.map((store) => this.writeCache(store))
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: StoreService, ids: Array<string>) {
    ids.forEach((id) => this.stores.delete(id))

    const {
      deleteStores: { nodesDeleted },
    } = yield* _await(
      storeApi.DeleteStores({
        where: { id_IN: ids },
        delete: deleteStoreInput,
      }),
    )

    return nodesDeleted
  })
}
