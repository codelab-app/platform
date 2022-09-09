import { DataNode } from 'antd/lib/tree'
import { ObjectMap, Ref } from 'mobx-keystone'
import { TagFragment } from './tag.fragment.graphql.gen'

// from graph-ql
export interface IGraphQLTagNode {
  id: string
  label: string
  children: Array<string>
  isRoot?: boolean
}

export interface ITagTreeNode {
  id: string
  label: string
  children: ObjectMap<ITagTreeNode>
  isRoot?: boolean
}

export interface ITagTreeService {
  roots: ObjectMap<ITagTreeNode>
  nodes: ObjectMap<Ref<ITagTreeNode>>
  // static init({ nodes }: { nodes: Array<any> }): ITagTreeService
  addNodesFromFragments(data: Array<TagFragment>): void
  delete(id: string): void
  updateNodeFromFragment(tagFragment: TagFragment): void
  generateTreeDataNodes(): Array<DataNode>
}
