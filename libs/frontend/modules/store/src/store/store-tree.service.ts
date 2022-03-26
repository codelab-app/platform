import { BaseTreeService } from '@codelab/frontend/shared/utils'
import { TreeDataNode } from 'antd'
import { computed } from 'mobx'
import {
  detach,
  ExtendedModel,
  model,
  modelClass,
  rootRef,
} from 'mobx-keystone'
import {
  StoreEdgeFragment,
  StoreFragment,
  StoreGraphFragment,
} from '../graphql/Store.fragment.v2.1.graphql.gen'
import { Store } from './store.model'

@model('@codelab/StoreTree')
export class StoreTree extends ExtendedModel(() => ({
  baseModel:
    modelClass<
      BaseTreeService<
        StoreFragment,
        StoreEdgeFragment,
        Store,
        StoreGraphFragment
      >
    >(BaseTreeService),
  props: {},
})) {
  @computed
  get antdTree(): Array<TreeDataNode> {
    return this.rootNodes.map((x) => Store.toTreeNode(x))
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
