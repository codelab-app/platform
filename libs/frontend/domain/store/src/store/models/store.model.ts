import {
  IAnyAction,
  IInterfaceType,
  IPropData,
  IStore,
  IStoreDTO,
} from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/domain/type'
import merge from 'lodash/merge'
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
import { actionRef } from './action.ref'

export const hydrate = ({ actions, id, name, api }: IStoreDTO) =>
  new Store({
    id,
    name,
    api: typeRef(api.id) as Ref<IInterfaceType>,
    actions: actions.map((a) => actionRef(a.id)),
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    api: prop<Ref<IInterfaceType>>().withSetter(),
    actions: prop<Array<Ref<IAnyAction>>>().withSetter(),
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
      this.api.current.fieldList
        ?.map((f) => ({ [f.key]: f.defaultValues.current.values }))
        .reduce(merge, {}),
      { ...this._actionsRunners },
      { ...this._state },
    )

    return state
  }

  @modelAction
  writeCache({ id, name, api }: IStoreDTO) {
    this.id = id
    this.name = name
    this.api = typeRef(api.id) as Ref<IInterfaceType>

    return this
  }

  @computed
  get _actionsRunners() {
    return this.actions
      .map((a) => ({
        [a.current.name]: {
          run: a.current.createRunner(this._state, this.updateState.bind(this)),
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
