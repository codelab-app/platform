import { Prop } from '@codelab/frontend/modules/element'
import { getTypeService, InterfaceType } from '@codelab/frontend/modules/type'
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

export const hydrate = ({
  actions,
  id,
  name,
  state,
  stateApi,
}: Omit<IStoreDTO, '__typename'>) =>
  new Store({
    id,
    name,
    actions: actions.map((action) => actionRef(action.id)),
    state: Prop.hydrate(state),
    stateApiId: stateApi.id,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    actions: prop<Array<Ref<IAnyAction>>>().withSetter(),
    state: prop<IProp>(),
    stateApiId: prop<string>().withSetter(),
  }))
  implements IStore
{
  @modelAction
  updateCache({
    id,
    name,
    actions,
    state,
    stateApi,
  }: Omit<IStoreDTO, '__typename'>) {
    this.id = id
    this.name = name
    this.actions = actions.map((a) => actionRef(a.id))
    this.stateApiId = stateApi.id
    this.state.updateCache(state)

    return this
  }

  @modelAction
  toMobxObservable(globals: IPropData = {}) {
    const typeService = getTypeService(this)
    const stateApi = typeService.type(this.stateApiId) as InterfaceType

    const storeState = [...stateApi.fields.values()].map((field) => ({
      [field.key]: this.state.values[field.key],
    }))

    const storeActions = this.actions.map((action) => ({
      [action.current.name]: {
        action: action.current,
        isAction: true,
      },
    }))

    const state = makeAutoObservable(
      merge({}, ...storeState, ...storeActions, globals),
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
