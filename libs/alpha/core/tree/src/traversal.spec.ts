import { treeData } from './data/tree.data'
import { makeTree } from './tree-factory'
import {
  traversePostOrder,
  traversePostOrderReducer,
} from '@codelab/alpha/core/traversal'
import { NodeA } from '@codelab/alpha/shared/interface/node'

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

  it('can use post order as a reducer', () => {
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

    const cb = (node: NodeA, acc: any) => {
      acc.push(node.id)
      // return [...acc, node.id]
    }

    const nodeList = traversePostOrderReducer([])(cb, root)

    expect(nodeList).toEqual(expectedQueue)
  })

  it('can use treeWalker as post order', () => {
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
})
