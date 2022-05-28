import { Prop } from '@codelab/frontend/modules/element'
import {
  createGraphQLAction,
  createRestAction,
} from '@codelab/frontend/modules/resource'
import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import {
  IGraphQLActionConfig,
  IProp,
  IRestActionConfig,
  IStore,
  IStoreDTO,
  ResourceType,
  STORE_NODE_TYPE,
} from '@codelab/shared/abstract/core'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { merge } from 'lodash'
import { computed, makeAutoObservable } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { Action, actionRef } from './action.model'

export const hydrate = ({
  actions,
  children,
  id,
  name,
  parentStoreConnection,
  state,
  stateApi,
  parentStore,
}: Omit<IStoreDTO, '__typename'>) =>
  new Store({
    id,
    name,
    parentStore: parentStore?.id ? storeRef(parentStore.id) : null,
    actions: actions.map((action) => actionRef(action.id)),
    storeKey: parentStoreConnection?.edges?.[0]?.storeKey,
    state: Prop.hydrate(state),
    stateApi: typeRef(stateApi.id) as Ref<InterfaceType>,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    __nodeType: prop<STORE_NODE_TYPE>(STORE_NODE_TYPE),

    parentStore: prop<Nullish<Ref<IStore>>>().withSetter(),
    children: prop(() => objectMap<Ref<IStore>>()),
    // STORE_PARENT relation property
    storeKey: prop<Nullable<string>>(null).withSetter(),

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

  @computed
  get isRoot(): boolean {
    return !this.parentStore
  }

  @computed
  get childrenList() {
    return [...this.children.values()].map((x) => x.current)
  }

  @computed
  get antdNode() {
    return {
      key: this.id,
      title: this.name,
      type: STORE_NODE_TYPE as STORE_NODE_TYPE,
      children: this.childrenList
        ? this.childrenList.map((child) => child.antdNode)
        : [],
    }
  }

  @modelAction
  updateCache({
    id,
    name,
    actions,
    parentStoreConnection,
    state,
    stateApi,
    parentStore,
  }: Omit<IStoreDTO, '__typename'>) {
    this.id = id
    this.name = name
    this.actions = actions.map((a) => actionRef(a.id))
    this.parentStore = parentStore?.id ? storeRef(parentStore.id) : null
    this.storeKey = parentStoreConnection?.edges[0]?.storeKey ?? null
    this.stateApi = typeRef(stateApi.id) as Ref<InterfaceType>
    this.state.updateCache(state)

    return this
  }

  @modelAction
  toMobxObservable(globals: any = {}) {
    const storeState = [...this.stateApi.current.fields.values()]
      .map((field) => ({ [field.key]: this.state.data[field.key] }))
      .reduce(merge, {})

    const storeActions = this.actions
      .map((actRef) => {
        const action = actRef.current
        let ac

        if (action.resource) {
          if (action.resource.current.type === ResourceType.GraphQL) {
            ac = createGraphQLAction(
              action.resource.current.config.values,
              action.config?.values as IGraphQLActionConfig,
              action.runOnInit,
            )
          } else if (action.resource.current.type === ResourceType.Rest) {
            ac = createRestAction(
              action.resource.current.config.values,
              action.config?.values as IRestActionConfig,
              action.runOnInit,
            )
          }
        }

        const ac2 = action.body
          ? { [action.name]: eval(`(${action.body})`) }
          : {}

        return { ...ac2 }
      })
      .reduce(merge, {})

    const childStores: any = this.childrenList
      .map((x) => ({
        [x.storeKey as string]: x.toMobxObservable(),
      }))
      .reduce(merge, {})

    return makeAutoObservable(
      merge({}, storeState, storeActions, childStores, globals),
    )
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
