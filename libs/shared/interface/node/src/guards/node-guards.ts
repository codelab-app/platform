import { NodeDtoA, NodeDtoI } from '../dto/node-dto'
import {
  NodeDtoModelA,
  NodeDtoModelI,
  NodeDtoSchemaA,
  NodeDtoSchemaI,
} from '../dto/node-dto--model'
import { NodeDtoReactA } from '../dto/node-dto--react'
import { NodeDtoTreeA, NodeDtoTreeRefA } from '../dto/node-dto--tree'
import { NodeTypeModelEnum } from '../enums/node-enum--model'
import { NodeTypeTreeEnum } from '../enums/node-enum--tree'

export const isModelNode = (
  node: NodeDtoI | NodeDtoA,
): node is NodeDtoModelI | NodeDtoModelA => {
  return node?.type === NodeTypeModelEnum.Model
}

export const isReactNode = (node: NodeDtoA): node is NodeDtoReactA => {
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

export const isTreeNode = (node: NodeDtoA): node is NodeDtoTreeA => {
  return node?.type === NodeTypeTreeEnum.Tree
}

export const isRefNode = (node: NodeDtoA): node is NodeDtoTreeRefA => {
  return node?.type === NodeTypeModelEnum.Model
}

export const isSchemaNode = (
  node: NodeDtoI | NodeDtoA,
): node is NodeDtoSchemaI | NodeDtoSchemaA => {
  return node?.type === NodeTypeModelEnum.Schema
}
