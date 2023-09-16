import type { IResourceModel } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IResourcesTreeDataNode = ITreeDataNode<{
  node: IResourceModel
  type: 'resource'
}>
