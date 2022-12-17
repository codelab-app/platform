import type { DataNode } from 'antd/lib/tree'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { ITagDTO } from './tag.dto.interface'

export interface ITag extends ICacheService<ITagDTO, ITag> {
  id: string
  isRoot: boolean
  name: string
  children: Array<Ref<ITag>>
  descendants: Array<Ref<ITag>>
  antdNode: DataNode
}

export type ITagRef = string
