import { Prop } from '@codelab/frontend/modules/element'
import { resourceRef } from '@codelab/frontend/modules/resource'
import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import {
  IProp,
  IResource,
  IStore,
  IStoreDTO,
  IStoreResource,
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
  ObjectMap,
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
  resources,
  resourcesConnection,
  state,
  stateApi,
  parentStore,
}: Omit<IStoreDTO, '__typename'>) =>
  new Store({
    id,
    name,
    parentStore: parentStore?.id ? storeRef(parentStore.id) : null,
    resources: resources.map((x) => resourceRef(x.id)),
    resourcesKeys: resourcesConnection.edges.map((x) => ({
      key: x.resourceKey,
      resourceId: x.node.id,
    })),
    children: new ObjectMap(children.map((c) => [c.id, storeRef(c.id)])),
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

    resources: prop<Array<Ref<IResource>>>(() => []),
    resourcesKeys: prop<Array<IStoreResource>>(() => []),

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

  @computed
  get resourcesList() {
    return this.resources.map((x) => ({
      id: x.current?.id,
      name: x.current?.name,
      config: x.current?.config,
      type: x.current?.type,
      key: this.resourcesKeys.find((y) => y.resourceId === x.id)?.key,
    }))
  }

  @modelAction
  updateCache({
    id,
    name,
    actions,
    children,
    parentStoreConnection,
    resources,
    resourcesConnection,
    state,
    stateApi,
    parentStore,
  }: Omit<IStoreDTO, '__typename'>) {
    this.id = id
    this.name = name
    this.actions = actions.map((a) => actionRef(a.id))
    this.resources = resources.map((r) => resourceRef(r.id))
    this.parentStore = parentStore?.id ? storeRef(parentStore.id) : null
    this.storeKey = parentStoreConnection?.edges[0]?.storeKey ?? null
    this.stateApi = typeRef(stateApi.id) as Ref<InterfaceType>
    this.state.updateCache(state)

    this.resourcesKeys = resourcesConnection.edges.map((c) => ({
      key: c.resourceKey,
      resourceId: c.node.id,
    }))

    return this
  }

  @modelAction
  toMobxObservable(globals: any = {}) {
    const storeState = [...this.stateApi.current.fields.values()]
      .map((field) => ({ [field.key]: this.state.data[field.key] }))
      .reduce(merge, {})

    const resources = this.resources
      .map((r) => {
        const key =
          this.resourcesKeys.find((k) => k.resourceId === r.current.id)?.key ||
          ''

        return { [key]: r.current.toMobxObservable() }
      })
      .reduce(merge, {})

    const storeActions = this.actions
      .map((action) => ({
        // eslint-disable-next-line no-eval
        [action.current.name]: eval(`(${action.current.body})`),
      }))
      .reduce(merge, {})

    const childStores: any = this.childrenList
      .map((x) => ({
        [x.storeKey as string]: x.toMobxObservable(),
      }))
      .reduce(merge, {})

    return makeAutoObservable(
      merge({}, storeState, storeActions, resources, childStores, globals),
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
