import type { IResource } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IResourcesTreeDataNode = ITreeDataNode<{
  node: IResource
  type: 'resource'
}>
