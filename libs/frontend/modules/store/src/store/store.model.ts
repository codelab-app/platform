import { Resource, resourceRef } from '@codelab/frontend/modules/resource'
import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import {
  IPropData,
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
    localState: prop<IPropData>(),
    state: prop<Ref<InterfaceType>>().withSetter(),
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
    const storeState = [...this.state.current.fields.values()]
      .map((field) => ({ [field.key]: this.localState[field.key] }))
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

  static hydrate(store: IStoreDTO): Store {
    return new Store({
      id: store.id,
      children: store.children.map((x) => storeRef(x.id)),
      name: store.name,
      parentStore: store.parentStore?.id
        ? storeRef(store.parentStore.id)
        : null,
      resources: store.resources.map((x) => resourceRef(x.id)),
      resourcesKeys: store.resourcesConnection.edges.map((x) => ({
        key: x.resourceKey,
        resourceId: x.node.id,
      })),
      actions: store.actions.map((action) => actionRef(action.id)),
      storeKey: store.parentStoreConnection?.edges?.[0]?.storeKey,
      localState: JSON.parse(store.localState),
      state: typeRef(store.state.id) as Ref<InterfaceType>,
    })
  }
}

export const storeRef = rootRef<Store>('@codelab/StoreRef', {
  onResolvedValueChange(ref, newStore, oldStore) {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
