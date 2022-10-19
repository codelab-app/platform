import {
  IApp,
  IInterfaceType,
  IProp,
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
import { IState } from 'react-use/lib/usePermission'
import { getActionService } from '../action.service'
import { State } from './state.model'

export const hydrate = ({ id, name, api }: IStoreDTO) =>
  new Store({
    id,
    name,
    api: typeRef(api.id) as Ref<IInterfaceType>,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    api: prop<Ref<IInterfaceType>>().withSetter(),
    state: prop<IState>(() => new State({})),
  }))
  implements IStore
{
  @modelAction
  writeCache({ id, name, api }: IStoreDTO) {
    this.id = id
    this.name = name
    this.api = typeRef(api.id) as Ref<IInterfaceType>

    return this
  }

  @modelAction
  updateState(state: IProp) {
    this._state = merge(this._state, this._state)
  }

  @computed
  get state() {
    return merge(this._defaultValues, this._runnableActions, this._state.values)
  }

  @computed
  get actions() {
    return getActionService(this).actionsList.filter(
      (x) => x.storeId === this.id,
    )
  }

  @computed
  get _defaultValues() {
    return this.api.current.fieldList
      .map((x) => ({ [x.key]: [] }))
      .reduce(merge, {})
  }

  @computed
  get _runnableActions() {
    return this.actions
      .map((a) => ({ [a.name]: { run: a.createRunner(this._state) } }))
      .reduce(merge, {})
  }

  @modelAction
  initState(apps: Array<IApp>) {
    this._state.setMany(apps.map((a) => a.toJson).reduce(merge, {}))
    this._state.setMany(this._defaultValues)
    this._state.setMany(this._runnableActions)
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
