import { treeData } from './data/tree.data'
import { traversePostOrder } from '@codelab/core/traversal'
import { makeTree } from '@codelab/core/tree'
import { NodeDtoA } from '@codelab/shared/interface/node'

describe('Node traversal', () => {
  it('can traverse post order', () => {
    const root = makeTree(treeData)
    const queue: Array<string> = []
    const expectedQueue: Array<string> = [
      'C',
      'D',
      'B',
      'A',
      'F',
      'G',
      'H',
      'E',
      'Root',
    ]

    const cb = (node: NodeDtoA) => {
      console.debug(`Traversing ${node.id}`)
      queue.push(node.id)
    }

    traversePostOrder(root, cb)

    expect(queue).toEqual(expectedQueue)
  })
})
