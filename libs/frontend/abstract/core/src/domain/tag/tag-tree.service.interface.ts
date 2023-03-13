import type { DataNode } from 'antd/lib/tree'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ITag } from './tag.model.interface'

export interface ITagTreeService {
  roots: ObjectMap<Ref<ITag>>
  antdTreeData: Array<DataNode>
  addRoots(tags: Array<ITag>): void
}
