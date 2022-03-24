import { detach, ExtendedModel, model, rootRef } from 'mobx-keystone'
import {
  StoreEdgeFragment,
  StoreFragment,
  StoreGraphFragment,
} from '../graphql/Store.fragment.v2.1.graphql.gen'
import { BaseTree } from './BaseTree'
import { StoreModel } from './StoreModel'

abstract class StoreTreeBase extends BaseTree<
  StoreModel,
  StoreFragment,
  StoreEdgeFragment,
  StoreGraphFragment
> {}

@model('@codelab/StoreTree')
export class StoreTree extends ExtendedModel(StoreTreeBase, {}) {
  nodeFromFragment(fragment: StoreFragment): StoreModel {
    return StoreModel.fromFragment(fragment)
  }
}

export const storeTreeRef = rootRef<StoreTree>('codelab/StoreTreeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
