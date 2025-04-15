import type { IRef, ITagDto } from '@codelab/shared-abstract-core'
import type { Ref } from 'mobx-keystone'

import type { ITreeNode } from '../shared'
import type { IModel } from '../shared/models/model.interface'
import type { ITagNodeData } from './tag.node.interface'

export interface ITagModel extends IModel<ITagDto, ITagModel> {
  children: Array<Ref<ITagModel>>
  descendants: Array<Ref<ITagModel>>
  id: string
  /**
   * Used for filtering to see which items to show in the tree
   */
  isRoot: boolean
  name: string
  owner: IRef
  parent?: Ref<ITagModel>
  treeNode: ITreeNode<ITagNodeData>
}
