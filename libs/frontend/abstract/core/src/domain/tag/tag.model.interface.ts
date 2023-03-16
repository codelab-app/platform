import type {
  TagCreateInput,
  TagUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { DataNode } from 'antd/lib/tree'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'
import type { IAuth0Owner } from '../user'
import type { ITagDTO } from './tag.dto.interface'

export interface ITag
  extends Omit<IModel<TagCreateInput, TagUpdateInput, void>, 'toDeleteInput'>,
    ICacheService<ITagDTO, ITag> {
  antdNode: DataNode
  children: Array<Ref<ITag>>
  descendants: Array<Ref<ITag>>
  id: string
  isRoot: boolean
  name: string
  owner: IAuth0Owner
}

export type ITagRef = string
