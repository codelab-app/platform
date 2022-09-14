import { Prop } from '@codelab/frontend/modules/element'
import {
  IAnyAction,
  IProp,
  IPropData,
  IStore,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import { keys, merge } from 'lodash'
import { makeAutoObservable } from 'mobx'
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

export const hydrate = ({ actions, id, name, state, api }: IStoreDTO) =>
  new Store({
    id,
    name,
    actions: actions.map((action) => actionRef(action.id)),
    state: Prop.hydrate(state),
    apiId: api.id,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    actions: prop<Array<Ref<IAnyAction>>>().withSetter(),
    state: prop<IProp>(),
    apiId: prop<string>().withSetter(),
  }))
  implements IStore
{
  @modelAction
  writeCache({ id, name, actions, state, api }: IStoreDTO) {
    this.id = id
    this.name = name
    this.actions = actions.map((a) => actionRef(a.id))
    this.apiId = api.id
    this.state.writeCache(state)

    return this
  }

  @modelAction
  toMobxObservable(globals: IPropData = {}) {
    const storeState = this.state.values

    const storeActions = this.actions.map((action) => ({
      [action.current.name]: {
        action: action.current,
        isAction: true,
      },
    }))

    const state = makeAutoObservable(
      merge({}, storeState, ...storeActions, globals),
    )

    for (const key of keys(state)) {
      if (state[key]?.isAction) {
        state[key].run = createActionFn(state[key].action, state)
      }
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
