import type { IResourceModel } from '../../resource'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IResourcesTreeDataNode = ITreeDataNode<{
  node: IResourceModel
  type: 'resource'
}>
