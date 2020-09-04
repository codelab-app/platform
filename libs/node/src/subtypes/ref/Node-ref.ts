import { Props } from '@codelab/props'
import * as t from 'io-ts'
import { withFallback } from 'io-ts-types/lib/withFallback'
import { nodeID } from '../../codec/Node--id'
import { NodeID, NodeTypeEnum, WithNodeType } from '../../codec/Node--type.i'

/**
 * Parent/child relationship is encoded using refs, is a flat array structure unlike TreeNodeInput
 */
export interface RefNodeI<P extends Props = any> extends WithNodeType {
  id: NodeID
  nodeType: 'Ref'
  props?: P
  parentRef?: NodeID
  childrenRef?: Array<NodeID>
}

export interface RefNodeA<P extends Props = any> extends WithNodeType {
  id: NodeID
  nodeType: 'Ref'
  props: P
  parentRef: NodeID
  childrenRef: Array<NodeID>
}

/**
 * Output type of brand is different
 *
 * https://github.com/gcanti/io-ts-codegen/issues/42
 */
export interface RefNodeO<P extends Props = any> extends WithNodeType {
  id: string
  nodeType: 'Ref'
  props?: P
  parentRef?: string
  childrenRef?: Array<string>
}

export const refNode: t.Type<RefNodeI, RefNodeO> = t.intersection([
  t.type({
    id: nodeID,
    // nodeType: createEnumType<NodeType>(NodeType, 'NodeType'),
    nodeType: t.literal(NodeTypeEnum.Ref),
  }),
  t.partial({
    props: withFallback(t.object, {}),
    parentRef: nodeID,
    childrenRef: t.array(nodeID),
  }),
])

export const isRefNode = (node: any): node is RefNodeI => {
  return node.nodeType === NodeTypeEnum.Ref
}
