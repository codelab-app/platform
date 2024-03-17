import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ITreeNode } from '../shared'
import type { ITagModel } from './tag.model.interface'
import type { ITagNodeData } from './tag.node.interface'

export interface ITagTreeService {
  antdTreeData: Array<ITreeNode<ITagNodeData>>
  roots: ObjectMap<Ref<ITagModel>>

  addRoots(tags: Array<ITagModel>): void
}
