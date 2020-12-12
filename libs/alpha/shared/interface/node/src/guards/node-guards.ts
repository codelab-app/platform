/**
 * Guards
 */

import { NodeA, NodeI } from '../dto'
import { Node } from '../node'

/**
 * Assertions
 */
export interface AssertsNodeI {
  (node: NodeI): asserts node
}

export interface AssertsNodeA {
  (node: NodeA | undefined): asserts node
}

export interface AssertsNode {
  (node: Node | undefined): asserts node
}

export const assertsNodeI: AssertsNodeI = (
  node: NodeI | undefined,
): asserts node is NodeI => {
  if (!node) {
    throw new Error('NodeA is not valid')
  }
}

export const assertsNodeA: AssertsNodeA = (
  node: NodeA | undefined,
): asserts node is NodeA => {
  if (!node?.id) {
    throw new Error('NodeA is not valid')
  }
}

export const assertsNode: AssertsNode = (
  node: Node | undefined,
): asserts node is Node => {
  if (!node) {
    throw new Error('Node is not valid')
  }
}
