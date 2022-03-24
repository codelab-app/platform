import { Maybe } from '@codelab/shared/abstract/types'
import { detach, ExtendedModel, model, prop, Ref, rootRef } from 'mobx-keystone'
import {
  StoreEdgeFragment,
  StoreFragment,
} from '../graphql/Store.fragment.v2.1.graphql.gen'
import { BaseModel } from './BaseTree'

abstract class StoreBaseModel extends BaseModel<StoreEdgeFragment> {}

@model('codelab/StoreModel')
export class StoreModel extends ExtendedModel(StoreBaseModel, {
  parentStore: prop<Maybe<Ref<StoreModel>>>().withSetter(),
  // PARENT_OF_STORE relation property
  storeKey: prop<string>().withSetter(),
  name: prop<string>(),
}) {
  getChildren(): Array<Ref<BaseModel<StoreEdgeFragment>>> {
    return this.children
  }

  addChild(child: BaseModel<StoreEdgeFragment>): void {
    this.children.push(storeRef(child.id))
  }

  setParent(parent: BaseModel<StoreEdgeFragment>): void {
    this.setParentStore(storeRef(parent.id))
  }

  setEdgeInfo(edge: StoreEdgeFragment): void {
    this.setStoreKey(edge.storeKey)
  }

  static fromFragment(store: StoreFragment): StoreModel {
    return new StoreModel({
      id: store.id,
      name: store.name,
      parentStore: store.parentStore?.id
        ? storeRef(store.parentStore?.id)
        : undefined,
      storeKey: store.parentStoreConnection?.edges?.[0]?.storeKey,
    })
  }
}

export const storeRef = rootRef<StoreModel>('StoreRef', {
  onResolvedValueChange(ref, newStore, oldStore) {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
