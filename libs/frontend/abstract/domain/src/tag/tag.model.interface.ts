import type {
  TagCreateInput,
  TagUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { ITag, ITagDto } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService, ITreeNode } from '../shared'
import type { IModel } from '../shared/models/model.interface'
import type { ITagNodeData } from './tag.node.interface'

export interface ITagModel
  extends Omit<
      IModel<TagCreateInput, TagUpdateInput, void, ITag>,
      'toDeleteInput'
    >,
    ICacheService<ITagDto, ITagModel> {
  children: Array<Ref<ITagModel>>
  descendants: Array<Ref<ITagModel>>
  /**
   * Used for filtering to see which items to show in the tree
   */
  isRoot: boolean
  name: string
  parent?: Ref<ITagModel>
  treeNode: ITreeNode<ITagNodeData>
}
