import { Props } from '@codelab/shared/interface/props'
import { WithNodeType } from '../../node--enum'
import { SchemaDefinition } from './node-schema--props'

export interface SchemaNode {
  nodeType: 'Schema'
  props: SchemaDefinition
}

export interface SchemaNodeI<P extends Props = any> extends WithNodeType {
  nodeType: 'Schema'
  props?: P
}
