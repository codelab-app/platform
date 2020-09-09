import { NodeI, NodeTypeEnum } from '../../codec'
import { SchemaNodeI } from './Node-schema'

export const isSchemaNode = (node: NodeI): node is SchemaNodeI => {
  return node.nodeType === NodeTypeEnum.Schema
}
