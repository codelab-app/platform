import { SchemaNode } from '../schema/Node-schema'

export interface ModelProps {
  name: string
}

export interface ModelNode {
  nodeType: 'Model'
  props: ModelProps
  children: Array<SchemaNode>
}
