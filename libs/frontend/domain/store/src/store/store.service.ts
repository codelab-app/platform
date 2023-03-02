import type {
  IActionDTO,
  ICreateStoreData,
  IInterfaceType,
  IStore,
  IStoreService,
  IUpdateStoreData,
} from '@codelab/frontend/abstract/core'
import { IAppDTO, IStoreDTO } from '@codelab/frontend/abstract/core'
import {
  getTypeService,
  InterfaceType,
  typeRef,
} from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { StoreWhere } from '@codelab/shared/abstract/codegen'
import { StoreFragment } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
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
import { v4 } from 'uuid'
import { deleteStoreInput } from '../utils'
import { getActionService } from './action.service'
import { makeStoreCreateInput, storeApi } from './apis'
import { actionRef, Store } from './models'
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

  @computed
  private get actionService() {
    return getActionService(this)
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
    const actions = stores
      .flatMap((store) => store.actions)
      .filter((action): action is IActionDTO => Boolean(action))

    return actions.map((action) => this.actionService.add(action))
  }

  @modelAction
  private async fetchStatesApis(stores: Array<IStoreDTO>) {
    return await this.typeService.getAllWithDescendants(
      stores.map((store) => store.api.id),
    )
  }

  // @modelAction
  // add(app: IAppDTO) {
  //   const interfaceType = this.typeService.addInterface({
  //     id: v4(),
  //     name: InterfaceType.createName(`${app.name} Store`),
  //     kind: ITypeKind.InterfaceType,
  //     owner: app.owner,
  //   }) as IInterfaceType

  //   const store = new Store({
  //     name: Store.createName(app),
  //     api: typeRef(interfaceType),
  //   })

  //   this.stores.set(store.id, store)

  //   return store
  // }

  @modelAction
  add({ id, name, api, actions }: IStoreDTO) {
    // const interfaceType = this.typeService.addInterface({
    //   id: storeDTO.api.id,
    //   name: storeDTO.api.,
    //   kind: ITypeKind.InterfaceType,
    //   owner: app.owner,
    // }) as IInterfaceType

    const store = new Store({
      id,
      name,
      api: typeRef(api.id) as Ref<IInterfaceType>,
      actions: actions?.map((action) =>
        actionRef(this.actionService.add(action)),
      ),
    })

    this.stores.set(store.id, store)

    return store
  }

  @modelFlow
  private mapStore(fragment: StoreFragment): IStoreDTO {
    return {
      ...fragment,
      actions: fragment.actions.map((action) =>
        this.actionService.actionFactory.fromActionFragment(action),
      ),
    }
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: StoreService, where?: StoreWhere) {
    const { stores } = yield* _await(storeApi.GetStores({ where }))

    return stores.map((store) => this.add(this.mapStore(store)))
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
  create = _async(function* (this: StoreService, data: ICreateStoreData) {
    const store = this.add(data)

    const {
      createStores: { stores },
    } = yield* _await(
      storeApi.CreateStores({ input: makeStoreCreateInput(data) }),
    )

    return store
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: StoreService,
    { name, id }: IUpdateStoreData,
  ) {
    const store = this.stores.get(id)

    store?.writeCache({ name })

    const {
      updateStores: { stores },
    } = yield* _await(
      storeApi.UpdateStores({
        where: { id },
        update: { name },
      }),
    )

    return store!
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: StoreService, id: string) {
    const store = this.stores.get(id)

    this.stores.delete(id)

    const {
      deleteStores: { nodesDeleted },
    } = yield* _await(
      storeApi.DeleteStores({
        where: { id },
        delete: deleteStoreInput,
      }),
    )

    return store!
  })
}
