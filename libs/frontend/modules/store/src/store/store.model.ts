import { Prop } from '@codelab/frontend/modules/element'
import { Resource, resourceRef } from '@codelab/frontend/modules/resource'
import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import {
  IProp,
  IStore,
  IStoreDTO,
  IStoreResource,
} from '@codelab/shared/abstract/core'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { TreeDataNode } from 'antd'
import { merge } from 'lodash'
import { computed, makeAutoObservable } from 'mobx'
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
  children,
  id,
  localState,
  name,
  parentStoreConnection,
  resources,
  resourcesConnection,
  state,
  parentStore,
}: Omit<IStoreDTO, '__typename'>): Store =>
  new Store({
    id,
    children: children.map((x) => storeRef(x.id)),
    name,
    parentStore: parentStore?.id ? storeRef(parentStore.id) : null,
    resources: resources.map((x) => resourceRef(x.id)),
    resourcesKeys: resourcesConnection.edges.map((x) => ({
      key: x.resourceKey,
      resourceId: x.node.id,
    })),
    actions: actions.map((action) => actionRef(action.id)),
    storeKey: parentStoreConnection?.edges?.[0]?.storeKey,
    state: Prop.hydrate(state),
    stateApi: typeRef(stateApi.id) as Ref<InterfaceType>,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    parentStore: prop<Nullish<Ref<Store>>>().withSetter(),
    children: prop<Array<Ref<Store>>>().withSetter(),
    // PARENT_OF_STORE relation property
    storeKey: prop<Nullable<string>>(null).withSetter(),

    resources: prop<Array<Ref<Resource>>>(() => []),
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
  toTreeNode(): TreeDataNode {
    return {
      key: this.id,
      title: this.name,
      children: this.children.map((child) => child.current.toTreeNode()),
    }
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

    const childStores: any = this.children
      .map((x) => ({
        [x.current.storeKey as string]: x.current.toMobxObservable(),
      }))
      .reduce(merge, {})

    return makeAutoObservable(
      merge({}, storeState, storeActions, resources, childStores, globals),
    )
  }

  static;
}

export const storeRef = rootRef<Store>('@codelab/StoreRef', {
  onResolvedValueChange(ref, newStore, oldStore) {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
