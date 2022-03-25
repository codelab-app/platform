import { BaseModel } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { TreeDataNode } from 'antd'
import { detach, ExtendedModel, model, prop, Ref, rootRef } from 'mobx-keystone'
import {
  StoreEdgeFragment,
  StoreFragment,
} from '../graphql/Store.fragment.v2.1.graphql.gen'

abstract class StoreBase extends BaseModel<StoreEdgeFragment> {}

@model('codelab/Store')
export class Store extends ExtendedModel(StoreBase, {
  parentStore: prop<Maybe<Ref<StoreBase>>>().withSetter(),
  // PARENT_OF_STORE relation property
  storeKey: prop<string>().withSetter(),
  name: prop<string>(),
}) {
  addChild(child: BaseModel<StoreEdgeFragment>): void {
    this.children.push(storeRef(child.id))
  }

  hasParent(): boolean {
    return !!this.parentStore
  }

  setParent(parent: BaseModel<StoreEdgeFragment>): void {
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
        ? store.children.map((x) => Store.toTreeNode(x.current as Store))
        : undefined,
    }
  }

  static fromFragment(store: StoreFragment): Store {
    return new Store({
      id: store.id,
      name: store.name,
      parentStore: store.parentStore?.id
        ? storeRef(store.parentStore?.id)
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
