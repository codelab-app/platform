import type { ITag } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type ITagsTreeDataNode = ITreeDataNode<{
  node: ITag
  type: 'tag'
}>
