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
  antdNode: ITreeNode<ITagNodeData>
  children: Array<Ref<ITagModel>>
  descendants: Array<Ref<ITagModel>>
  isRoot: boolean
  name: string
}
