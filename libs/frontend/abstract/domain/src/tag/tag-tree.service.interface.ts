import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ITagsTreeDataNode } from '../shared'
import type { ITagModel } from './tag.model.interface'

export interface ITagTreeService {
  antdTreeData: Array<ITagsTreeDataNode>
  roots: ObjectMap<Ref<ITagModel>>

  addRoots(tags: Array<ITagModel>): void
}
