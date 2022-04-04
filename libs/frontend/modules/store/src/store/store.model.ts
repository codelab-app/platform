import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import { BaseModel } from '@codelab/frontend/shared/utils'
import { PropsData } from '@codelab/shared/abstract/core'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { TreeDataNode } from 'antd'
import { merge } from 'lodash'
import { makeAutoObservable } from 'mobx'
import {
  detach,
  ExtendedModel,
  model,
  modelAction,
  modelClass,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import {
  StoreEdgeFragment,
  StoreFragment,
} from '../graphql/Store.fragment.v2.1.graphql.gen'
import { Action, actionRef } from './action.model'

@model('codelab/Store')
export class Store extends ExtendedModel(() => ({
  baseModel: modelClass<BaseModel<Store, StoreEdgeFragment>>(BaseModel),
  props: {
    parentStore: prop<Nullish<Ref<Store>>>().withSetter(),
    // PARENT_OF_STORE relation property
    storeKey: prop<Nullable<string>>(null).withSetter(),
    name: prop<string>(),
    actions: prop<Array<Ref<Action>>>().withSetter(),
    initialState: prop<PropsData>(),
    state: prop<Ref<InterfaceType>>().withSetter(),
  },
})) {
  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

  getParent(): Nullable<Store> {
    return this.parentStore?.current ? this.parentStore?.current : null
  }

  @modelAction
  addChild(child: Store): void {
    this.children.push(storeRef(child.id))
  }

  hasParent(): boolean {
    return !!this.parentStore
  }

  @modelAction
  setParent(parent: Store): void {
    this.setParentStore(storeRef(parent.id))
  }

  @modelAction
  setEdgeInfo(edge: StoreEdgeFragment): void {
    this.setStoreKey(edge.storeKey)
  }

  static toTreeNode(store: Store): TreeDataNode {
    return {
      key: store.id,
      title: store.name,
      children: store.children
        ? store.children.map((x) => Store.toTreeNode(x.current))
        : undefined,
    }
  }

  @modelAction
  toMobxObservable() {
    const storeState = this.state.current.fields
      .map((field) => ({ [field.key]: this.initialState[field.key] }))
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

    return makeAutoObservable(merge({}, storeState, storeActions, childStores))
  }

  static fromFragment(store: StoreFragment): Store {
    return new Store({
      id: store.id,
      name: store.name,
      parentStore: store.parentStore?.id
        ? storeRef(store.parentStore.id)
        : null,
      actions: store.actions.map((action) => actionRef(action.id)),
      storeKey: store.parentStoreConnection?.edges?.[0]?.storeKey,
      initialState: JSON.parse(store.initialState),
      state: typeRef(store.state.id) as Ref<InterfaceType>,
    })
  }
}

export const storeRef = rootRef<Store>('StoreRef', {
  onResolvedValueChange(ref, newStore, oldStore) {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
