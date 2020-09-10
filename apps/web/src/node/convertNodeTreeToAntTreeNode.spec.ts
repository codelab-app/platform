import { Node } from '@codelab/core/node'
import { convertNodeTreeToAntTreeDataNode } from './convertNodeTreeToAntTreeNode'

describe('convertNodeTreeToAntTreeNode. Single node without children', () => {
  let node: Node

  beforeAll(() => {
    node = new Node({ nodeType: 'React', type: 'Alert', id: 'key' })
  })
  it('should convert id of the node to key of the antd tree node', () => {
    expect(convertNodeTreeToAntTreeDataNode(node).key).toBe(node.id)
  })
  it('should set title of tree node to node nodeType', () => {
    expect(convertNodeTreeToAntTreeDataNode(node).title).toBe(node.nodeType)
  })
})

describe('convertNodeTreeToAntTreeNode. Node with child', () => {
  let parent: Node
  let child: Node
  let child2: Node
  let grandchild: Node

  beforeAll(() => {
    parent = new Node({ nodeType: 'Tree', id: 'parent' })
    child = new Node({ nodeType: 'Tree', id: 'child' })
    child2 = new Node({ nodeType: 'Tree', id: 'child' })
    grandchild = new Node({ nodeType: 'Tree', id: 'child' })
    parent.addChild(child)
    parent.addChild(child2)
    child.addChild(grandchild)
  })
  it('should create tree props from node with nested children', () => {
    const treeProps = convertNodeTreeToAntTreeDataNode(parent)

    expect(treeProps.children.find((c) => c.key === child.id)).toBeDefined()
    expect(treeProps.children.find((c) => c.key === child2.id)).toBeDefined()
    expect(
      treeProps.children
        .find((c) => c.key === child.id)
        .children.find((c) => c.key === grandchild.id),
    ).toBeDefined()
  })
})
