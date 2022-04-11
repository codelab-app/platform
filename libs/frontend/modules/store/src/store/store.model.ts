import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import { IPropData } from '@codelab/shared/abstract/core'
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
import { StoreFragment } from '../graphql/store.fragment.graphql.gen'
import { Action, actionRef } from './action.model'

@model('codelab/Store')
export class Store extends Model(() => ({
  id: idProp,
  parentStore: prop<Nullish<Ref<Store>>>().withSetter(),
  children: prop<Array<Ref<Store>>>().withSetter(),
  // PARENT_OF_STORE relation property
  storeKey: prop<Nullable<string>>(null).withSetter(),
  name: prop<string>(),
  actions: prop<Array<Ref<Action>>>().withSetter(),
  initialState: prop<IPropData>(),
  state: prop<Ref<InterfaceType>>().withSetter(),
})) {
  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

  @computed
  get isRoot(): boolean {
    return !this.parentStore
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
      children: store.children.map((x) => storeRef(x.id)),
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
