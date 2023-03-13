import type { DataNode } from 'antd/lib/tree'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ITag } from './tag.model.interface'

export interface ITagTreeService {
  antdTreeData: Array<DataNode>
  roots: ObjectMap<Ref<ITag>>

  addRoots(tags: Array<ITag>): void
}
