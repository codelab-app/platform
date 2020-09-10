import { SchemaNode } from '../schema/node-schema'

export interface ModelProps {
  name: string
}

export interface ModelNode {
  nodeType: 'Model'
  props: ModelProps
  children: Array<SchemaNode>
}
