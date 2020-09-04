import { Props } from '@codelab/props'
import { NodeTypeEnum, WithNodeType } from '../../codec/Node--type.i'
import { SchemaDefinition } from './Node-schema--props'

export interface SchemaNode {
  nodeType: 'Schema'
  props: SchemaDefinition
}

export interface SchemaNodeI<P extends Props = any> extends WithNodeType {
  nodeType: NodeTypeEnum.Schema
  props?: P
}

export const isSchemaNode = (node: any): node is SchemaNodeI => {
  return node.nodeType === NodeTypeEnum.Schema
}
