// TODO: type is undefined for some reason

import { AssertsNodeI } from './node-guards'
import {
  ModelA,
  ModelI,
  NodeI,
  NodeType,
  SchemaI,
} from '@codelab/shared/interface/node'

/**
 * Guards
 */
export const isModelI = (node: NodeI): node is ModelI => {
  return node?.type === NodeType.Model
}

export const isSchemaI = (node: NodeI): node is SchemaI => {
  return node?.type === NodeType.Schema
}

export const assertsModelI: AssertsNodeI = (
  node: NodeI,
): asserts node is ModelI => {
  if (node?.type !== NodeType.Model) {
    throw new Error(`${node} is not of type ModelI`)
  }
}

interface AssertsModelA {
  (node: NodeI): asserts node is ModelA
}

export const assertsModelA: AssertsModelA = (
  node: NodeI,
): asserts node is ModelA => {
  if (node?.type !== NodeType.Model) {
    throw new Error(`${node} is not of type ModelI`)
  }
}
