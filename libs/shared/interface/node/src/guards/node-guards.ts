import { NodeDtoA, NodeDtoI } from '../dto/node-dto'
import { NodeDtoModelI, NodeDtoSchemaI } from '../dto/node-dto--model'
import { NodeDtoReactA, NodeDtoReactI } from '../dto/node-dto--react'
import {
  NodeDtoTreeA,
  NodeDtoTreeI,
  NodeDtoTreeRefA,
  NodeDtoTreeRefI,
} from '../dto/node-dto--tree'
import { NodeTypeModelEnum } from '../enums/node-enum--model'
import { NodeTypeTreeEnum } from '../enums/node-enum--tree'

// TODO: type is undefined for some reason
export const isModelNode = (node: NodeDtoI): node is NodeDtoModelI => {
  return node?.type === NodeTypeModelEnum.Model
}

interface AssertModelNode {
  (node: NodeDtoI): asserts node
}

export const assertModelI: AssertModelNode = (
  node: NodeDtoI,
): asserts node is NodeDtoModelI => {
  if (node?.type === NodeTypeModelEnum.Model) {
    throw new Error(`${node} is not of type NodeDtoModelI`)
  }
}

export const isReactNode = (
  node: NodeDtoI | NodeDtoA,
): node is NodeDtoReactI | NodeDtoReactA => {
  if (typeof node?.type !== 'string') {
    return false
  }

  return node?.type.includes('React.')
}

export const isReactNodeArray = (
  nodes: Array<NodeDtoReactI | NodeDtoReactA> = [],
): nodes is Array<NodeDtoReactI | NodeDtoReactA> => {
  if (!Array.isArray(nodes)) return false

  if (nodes.length === 0) return false

  return nodes.filter((node) => !isReactNode(node)).length === 0
}

export const isTreeNode = (
  node: NodeDtoI | NodeDtoA,
): node is NodeDtoTreeI | NodeDtoTreeA => {
  return node?.type === NodeTypeTreeEnum.Tree
}

export const isRefNode = (
  node: NodeDtoI | NodeDtoA,
): node is NodeDtoTreeRefI | NodeDtoTreeRefA => {
  return node?.type === NodeTypeModelEnum.Model
}

export const isSchemaNode = (node: NodeDtoI): node is NodeDtoSchemaI => {
  return node?.type === NodeTypeModelEnum.Schema
}
