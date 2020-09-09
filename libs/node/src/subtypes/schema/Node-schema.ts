import { Props } from '@codelab/shared/interface'
import { WithNodeType } from '../../codec/Node--type.i'
import { SchemaDefinition } from './Node-schema--props'

export interface SchemaNode {
  nodeType: 'Schema'
  props: SchemaDefinition
}

export interface SchemaNodeI<P extends Props = any> extends WithNodeType {
  nodeType: 'Schema'
  props?: P
}
