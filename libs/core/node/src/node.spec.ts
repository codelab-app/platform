import { findNode } from '@codelab/core/graph'
import { Node } from './base/Node'

describe('Node', () => {
  it('can add a child', () => {
    const parent = new Node({ id: 'parent', nodeType: 'Tree' })
    const child = new Node({ id: 'child', nodeType: 'Tree' })

    expect(parent.hasChildren()).toBeFalsy()

    parent.addChild(child)

    expect(parent.hasChildren()).toBeTruthy()

    const { children } = parent

    expect(children).toContain(child)
  })

  it('can add a second child', () => {
    const parent = new Node({ id: 'parent', nodeType: 'Tree' })
    const child = new Node({ id: 'child', nodeType: 'Tree' })
    const secondChild = new Node({ id: 'secondChild', nodeType: 'Tree' })

    parent.addChild(child)
    parent.addChild(secondChild)

    const { children } = parent

    expect(children).toEqual([child, secondChild])
  })

  it('can find a node', () => {
    const parent = new Node({ id: 'parent', nodeType: 'Tree' })
    const child = new Node({ id: 'child', nodeType: 'Tree' })
    const secondChild = new Node({ id: 'secondChild', nodeType: 'Tree' })
    const grandChild = new Node({ id: 'grandChild', nodeType: 'Tree' })

    parent.addChild(child)
    parent.addChild(secondChild)
    secondChild.addChild(grandChild)

    const found = findNode(grandChild?.id, parent)

    expect(found).toBe(grandChild)
  })
})
