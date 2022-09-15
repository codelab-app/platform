import { getTypeService } from '@codelab/frontend/modules/type'
import {
  IAnyAction,
  IInterfaceType,
  IPropData,
  IStore,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import { keys, merge } from 'lodash'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { createActionFn } from '../createActionFn'
import { actionRef } from './action.ref'

export const hydrate = ({ actions, id, name, api }: IStoreDTO) =>
  new Store({
    id,
    name,
    actions: actions.map((action) => actionRef(action.id)),
    apiId: api.id,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    actions: prop<Array<Ref<IAnyAction>>>().withSetter(),
    apiId: prop<string>().withSetter(),
    initialState: prop<IPropData>(() => ({})).withSetter(),
  }))
  implements IStore
{
  @modelAction
  writeCache({ id, name, actions, api }: IStoreDTO) {
    this.id = id
    this.name = name
    this.actions = actions.map((a) => actionRef(a.id))
    this.apiId = api.id

    return this
  }

  @computed
  get _api() {
    const typeService = getTypeService(this)

    return typeService.type(this.apiId) as IInterfaceType
  }

  @computed
  get _storeActions() {
    return this.actions
      .map((action) => ({
        [action.current.name]: { action: action.current },
      }))
      .reduce(merge, {})
  }

  @computed
  get state() {
    const state: IPropData = merge(
      {},
      this.initialState,
      this._api.defaults,
      this._storeActions,
    )

    console.log(this._storeActions)

    for (const key of keys(this._storeActions)) {
      state[key].run = createActionFn(state[key].action, state)
    }

    return state
  }

  static hydrate = hydrate
}

export const storeRef = rootRef<IStore>('@codelab/StoreRef', {
  onResolvedValueChange(ref, newStore, oldStore) {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
