import { getTypeService } from '@codelab/frontend/modules/type'
import {
  IInterfaceType,
  IPropData,
  IStore,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'
import { getActionService } from '../action.service'

export const hydrate = ({ actions, id, name, api }: IStoreDTO) =>
  new Store({
    id,
    name,
    apiId: api.id,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    apiId: prop<string>().withSetter(),
    _state: prop<IPropData>(() => ({})),
  }))
  implements IStore
{
  @modelAction
  updateState(data: IPropData) {
    this._state = merge(this._state, data)
  }

  @computed
  get state() {
    const state: IPropData = merge(
      { ...this._api.defaults },
      { ...this._actionsRunners },
      { ...this._state },
    )

    return state
  }

  @modelAction
  writeCache({ id, name, api }: IStoreDTO) {
    this.id = id
    this.name = name
    this.apiId = api.id

    return this
  }

  @computed
  get _api() {
    const typeService = getTypeService(this)

    return typeService.type(this.apiId) as IInterfaceType
  }

  @computed
  get actions() {
    const actionService = getActionService(this)

    return actionService.actionsList.filter((a) => a.storeId === this.id)
  }

  @computed
  get _actionsRunners() {
    return this.actions
      .map((a) => ({
        [a.name]: {
          run: a.createRunner(this._state, this.updateState.bind(this)),
        },
      }))
      .reduce(merge, {})
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
