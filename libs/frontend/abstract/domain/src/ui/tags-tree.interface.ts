import type { ITagModel } from '../../tag'
import type { ITreeDataNode } from './tree-data-node.interface'

export type ITagsTreeDataNode = ITreeDataNode<{
  node: ITagModel
  type: 'tag'
}>
