import { NodeService as NodeServiceEntity } from '@codelab/core/node'

export interface ContextNode {
  nodes: Array<any>
  node: any
  nodeService: NodeServiceEntity
}
