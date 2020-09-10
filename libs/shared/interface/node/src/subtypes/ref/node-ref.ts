import { Props } from '@codelab/shared/interface/props'
import { NodeID, WithNodeType } from '../../node--enum'

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
