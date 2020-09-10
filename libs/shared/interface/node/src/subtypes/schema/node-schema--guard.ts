import { SchemaNodeI } from './node-schema'
import { NodeI } from '../../node--codec'
import { NodeTypeEnum } from '../../node--enum'

export const isSchemaNode = (node: NodeI): node is SchemaNodeI => {
  return node.nodeType === NodeTypeEnum.Schema
}
