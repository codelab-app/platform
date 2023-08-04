import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ITagsTreeDataNode } from '../../ui'
import type { ITag } from './tag.model.interface'

export interface ITagTreeService {
  antdTreeData: Array<ITagsTreeDataNode>
  roots: ObjectMap<Ref<ITag>>

  addRoots(tags: Array<ITag>): void
}
