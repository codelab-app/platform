import { Prop } from '@codelab/frontend/modules/element'
import {
  createGraphQLAction,
  createRestAction,
} from '@codelab/frontend/modules/resource'
import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import {
  IProp,
  IStore,
  IStoreDTO,
  ResourceType,
} from '@codelab/shared/abstract/core'
import { merge } from 'lodash'
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
import { Action, actionRef } from './action.model'

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
    stateApi: typeRef(stateApi.id) as Ref<InterfaceType>,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    actions: prop<Array<Ref<Action>>>().withSetter(),
    state: prop<IProp>(),
    stateApi: prop<Ref<InterfaceType>>().withSetter(),
  }))
  implements IStore
{
  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

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
    this.stateApi = typeRef(stateApi.id) as Ref<InterfaceType>
    this.state.updateCache(state)

    return this
  }

  @modelAction
  toMobxObservable(globals: any = {}) {
    const storeState = [...this.stateApi.current.fields.values()]
      .map((field) => ({ [field.key]: this.state.values[field.key] }))
      .reduce(merge, {})

    const storeActions = this.actions
      .map(({ current: action }) => {
        const isResourceOperation =
          action.resource?.current && action.config?.values

        if (!isResourceOperation && !action.body) {
          throw new Error(
            'Action misconfigure, an action must have either a resource and config or a body or both ',
          )
        }

        // an action that manipulates local state only
        if (!isResourceOperation) {
          // eslint-disable-next-line no-eval
          return { [action.name]: eval(`(${action.body})`) }
        }

        const actionInst =
          action.resource?.current.type === ResourceType.GraphQL
            ? createGraphQLAction(action)
            : createRestAction(action)

        return { [action.name]: actionInst }
      })
      .reduce(merge, {})

    return makeAutoObservable(merge({}, storeState, storeActions, globals))
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
