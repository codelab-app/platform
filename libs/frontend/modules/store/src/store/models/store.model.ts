import { Prop } from '@codelab/frontend/modules/element'
import {
  createGraphQLAction,
  createRestAction,
} from '@codelab/frontend/modules/resource'
import { getTypeService, InterfaceType } from '@codelab/frontend/modules/type'
import {
  IActionKind,
  IAnyAction,
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
    this.stateApiId = stateApi.id
    this.state.updateCache(state)

    return this
  }

  @modelAction
  toMobxObservable(globals: any = {}) {
    const typeService = getTypeService(this)
    const stateApi = typeService.type(this.stateApiId) as InterfaceType

    const storeState = [...stateApi.fields.values()]
      .map((field) => ({ [field.key]: this.state.values[field.key] }))
      .reduce(merge, {})

    const storeActions = this.actions
      .map(({ current: action }) => {
        // an action that manipulates local state only
        if (action.type === IActionKind.CustomAction) {
          // eslint-disable-next-line no-eval
          return { [action.name]: eval(`(${action.code})`) }
        }

        if (action.type === IActionKind.ResourceAction) {
          const actionInst =
            action.resource?.current.type === ResourceType.GraphQL
              ? createGraphQLAction(action)
              : createRestAction(action)

          return { [action.name]: actionInst }
        }

        if (action.type === IActionKind.PipelineAction) {
          // TODO: implement pipeline action
        }
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
