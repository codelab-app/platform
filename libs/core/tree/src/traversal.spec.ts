import { treeData } from './data/tree.data'
import {
  traversePostOrder,
  traversePostOrderReducer,
} from '@codelab/core/traversal'
import { makeTree } from '@codelab/core/tree'
import { NodeA } from '@codelab/shared/interface/node'

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

    const cb = (node: NodeA) => {
      console.debug(`Traversing ${node.id}`)
      queue.push(node.id)
    }

    traversePostOrder(root, cb)

    expect(queue).toEqual(expectedQueue)
  })

  it('can use treeWalker as a reducer', () => {
    const root = makeTree(treeData)
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

    // TODO: Need to move acc immutable
    const cb = (node: NodeA, acc: any) => {
      acc.push(node.id)
      // return [...acc, node.id]
    }

    const nodeList = traversePostOrderReducer([])(cb, root)

    expect(nodeList).toEqual(expectedQueue)
  })
})
