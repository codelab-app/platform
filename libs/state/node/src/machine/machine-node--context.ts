import { NodeService as NodeServiceEntity } from '@codelab/core/node'
import { NodeA } from '@codelab/shared/interface/node'

export interface ContextNode {
  nodes: Array<NodeA>
  node: null | NodeA
  editedNode: null | NodeA
  nodeService: NodeServiceEntity
}
