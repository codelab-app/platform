import { NodeDtoA } from '../dto/node-dto'
import {
  NodeModelDtoA,
  NodeReactDtoA,
  NodeRefDtoA,
  NodeSchemaDtoA,
  NodeTreeDtoA,
} from '../dto/node-dto--sub'
import { NodeTypeEnum } from '../enums/node-enum'

// TODO: type is undefined on some nodes for some reason
export const isModelNode = (node: NodeDtoA): node is NodeModelDtoA => {
  return node?.type === NodeTypeEnum.Model
}

export const isReactNode = (node: NodeDtoA): node is NodeReactDtoA => {
  if (typeof node?.type !== 'string') {
    return false
  }

  return node.type.includes('React.')
}

export const isReactNodeArray = (
  nodes: Array<NodeDtoA> = [],
): nodes is Array<NodeDtoA> => {
  if (!Array.isArray(nodes)) return false

  if (nodes.length === 0) return false

  return nodes.filter((node) => !isReactNode(node)).length === 0
}

export const isTreeNode = (node: NodeDtoA): node is NodeTreeDtoA => {
  return node?.type === NodeTypeEnum.Tree
}

export const isRefNode = (node: NodeDtoA): node is NodeRefDtoA => {
  return node?.type === NodeTypeEnum.Model
}

export const isSchemaNode = (node: NodeDtoA): node is NodeSchemaDtoA => {
  return node?.type === NodeTypeEnum.Schema
}
