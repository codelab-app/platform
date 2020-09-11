import { NodeInterface } from '@codelab/shared/interface/node'
import { makeTree } from '@codelab/core/tree'
import { treeData } from '../../tree/src/data/tree.data'
import { traversePostOrder } from './traversal'

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

    const cb = (node: NodeInterface) => {
      queue.push(node.id)
    }

    traversePostOrder(root, cb)

    expect(queue).toEqual(expectedQueue)
  })
})
