import type { ITag, ITagDto } from '@codelab/shared/abstract/core'
import type { TagCreateInput, TagUpdateInput } from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import type { ITreeNode } from '../shared'
import type { IModel } from '../shared/models/model.interface'
import type { ITagNodeData } from './tag.node.interface'

export interface ITagModel extends IModel<ITag, ITagModel> {
  children: Array<Ref<ITagModel>>
  descendants: Array<Ref<ITagModel>>
  id: string
  /**
   * Used for filtering to see which items to show in the tree
   */
  isRoot: boolean
  name: string
  parent?: Ref<ITagModel>
  treeNode: ITreeNode<ITagNodeData>
}
