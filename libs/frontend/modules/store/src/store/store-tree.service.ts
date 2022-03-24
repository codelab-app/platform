import { BaseTreeService } from '@codelab/frontend/shared/utils'
import { TreeDataNode } from 'antd'
import { detach, ExtendedModel, model, rootRef } from 'mobx-keystone'
import {
  StoreEdgeFragment,
  StoreFragment,
  StoreGraphFragment,
} from '../graphql/Store.fragment.v2.1.graphql.gen'
import { Store } from './store.model'

abstract class StoreTreeBase extends BaseTreeService<
  Store,
  StoreFragment,
  StoreEdgeFragment,
  StoreGraphFragment
> {}

@model('@codelab/StoreTree')
export class StoreTree extends ExtendedModel(StoreTreeBase, {}) {
  getAntdTree(): Array<TreeDataNode> {
    return this.nodesList.map(Store.toTreeNode)
  }

  nodeFromFragment(fragment: StoreFragment): Store {
    return Store.fromFragment(fragment)
  }
}

export const storeTreeRef = rootRef<StoreTree>('codelab/StoreTreeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
