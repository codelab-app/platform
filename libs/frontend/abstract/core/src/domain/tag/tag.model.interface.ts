import type {
  TagCreateInput,
  TagUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { ITagDTO } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { ITagsTreeDataNode } from '../../ui'
import type { IModel } from '../model.interface'

export interface ITagModel
  extends Omit<IModel<TagCreateInput, TagUpdateInput, void>, 'toDeleteInput'>,
    ICacheService<ITagDTO, ITagModel> {
  antdNode: ITagsTreeDataNode
  children: Array<Ref<ITagModel>>
  descendants: Array<Ref<ITagModel>>
  id: string
  isRoot: boolean
  name: string
}

export type ITagRef = string
