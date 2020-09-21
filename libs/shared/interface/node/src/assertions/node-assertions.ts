import { NodeDtoA } from '../dto/node-dto'

interface IsNode {
  (node: NodeDtoA): asserts node
}

interface IsID {
  (id: string | undefined): asserts id
}

export const isNode: IsNode = (
  node: NodeDtoA | undefined,
): asserts node is NodeDtoA => {
  if (!node) {
    throw new Error('Node is not defined')
  }
}

export const isID: IsID = (id: string | undefined): asserts id is string => {
  if (typeof id === undefined) {
    throw new Error('ID is not defined')
  }
}
