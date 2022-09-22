import { DataNode } from 'antd/lib/tree'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ITag } from './tag.model.interface'

export interface ITagTreeService {
  roots: ObjectMap<Ref<ITag>>
  addRoots(tags: Array<ITag>): void
  antdTreeData: Array<DataNode>
}
