import { BaseModel } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { TreeDataNode } from 'antd'
import {
  detach,
  ExtendedModel,
  model,
  modelClass,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import {
  StoreEdgeFragment,
  StoreFragment,
} from '../graphql/Store.fragment.v2.1.graphql.gen'

@model('codelab/Store')
export class Store extends ExtendedModel(() => ({
  baseModel: modelClass<BaseModel<Store, StoreEdgeFragment>>(BaseModel),
  props: {
    parentStore: prop<Maybe<Ref<Store>>>().withSetter(),
    // PARENT_OF_STORE relation property
    storeKey: prop<string>().withSetter(),
    name: prop<string>(),
  },
})) {
  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

  addChild(child: Store): void {
    this.children.push(storeRef(child.id))
  }

  hasParent(): boolean {
    return !!this.parentStore
  }

  setParent(parent: Store): void {
    this.setParentStore(storeRef(parent.id))
  }

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

  static fromFragment(store: StoreFragment): Store {
    return new Store({
      id: store.id,
      name: store.name,
      parentStore: store.parentStore?.id
        ? storeRef(store.parentStore.id)
        : undefined,
      storeKey: store.parentStoreConnection?.edges?.[0]?.storeKey,
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
