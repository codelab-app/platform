import { NodeService as NodeServiceEntity } from '@codelab/alpha/core/node'
import { NodeA } from '@codelab/alpha/shared/interface/node'

export interface ContextNode {
  nodes: Array<NodeA>
  node: null | NodeA
  editedNode: null | NodeA
  nodeService: NodeServiceEntity
}
