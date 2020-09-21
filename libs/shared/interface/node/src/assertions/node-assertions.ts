import { NodeDtoA } from '../dto/node-dto'
import { Node } from '../node'

interface IsNodeDtoA {
  (node: NodeDtoA | undefined): asserts node
}

interface IsNode {
  (node: Node | undefined): asserts node
}

interface IsID {
  (id: string | undefined): asserts id
}

export const isNodeDtoA: IsNodeDtoA = (
  node: NodeDtoA | undefined,
): asserts node is NodeDtoA => {
  if (!node) {
    throw new Error('NodeDtoA is not defined')
  }
}

export const isNode: IsNode = (
  node: Node | undefined,
): asserts node is Node => {
  if (!node) {
    throw new Error('Node is not defined')
  }
}

export const isID: IsID = (id: string | undefined): asserts id is string => {
  if (typeof id === undefined) {
    throw new Error('ID is not defined')
  }
}
