// TODO: type is undefined for some reason
import { ModelType } from '../enums/node-enum--model'
import { AssertsNodeI } from './node-guards'
import { ModelA, ModelI, NodeI, SchemaI } from '@codelab/shared/interface/node'

/**
 * Guards
 */
export const isModelI = (node: NodeI): node is ModelI => {
  return node?.type === ModelType.Model
}

export const isSchemaI = (node: NodeI): node is SchemaI => {
  return node?.type === ModelType.Schema
}

export const assertsModelI: AssertsNodeI = (
  node: NodeI,
): asserts node is ModelI => {
  if (node?.type !== ModelType.Model) {
    throw new Error(`${node} is not of type ModelI`)
  }
}

export const assertsModelA: AssertsNodeI = (
  node: NodeI,
): asserts node is ModelA => {
  if (node?.type !== ModelType.Model) {
    throw new Error(`${node} is not of type ModelI`)
  }
}
