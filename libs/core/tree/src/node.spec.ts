import { NodeEntity } from '@codelab/core/node'
import { findNode } from '@codelab/core/tree'

describe('Node', () => {
  it('can add a child', () => {
    const parent = new NodeEntity({ id: 'parent', type: 'Tree' })
    const child = new NodeEntity({ id: 'child', type: 'Tree' })

    expect(parent.hasChildren()).toBeFalsy()

    parent.addChild(child)

    expect(parent.hasChildren()).toBeTruthy()

    const { children } = parent

    expect(children).toContain(child)
  })

  it('can add a second child', () => {
    const parent = new NodeEntity({ id: 'parent', type: 'Tree' })
    const child = new NodeEntity({ id: 'child', type: 'Tree' })
    const secondChild = new NodeEntity({ id: 'secondChild', type: 'Tree' })

    parent.addChild(child)
    parent.addChild(secondChild)

    const { children } = parent

    expect(children).toEqual([child, secondChild])
  })

  it('can find a node', () => {
    const parent = new NodeEntity({ id: 'parent', type: 'Tree' })
    const child = new NodeEntity({ id: 'child', type: 'Tree' })
    const secondChild = new NodeEntity({ id: 'secondChild', type: 'Tree' })
    const grandChild = new NodeEntity({ id: 'grandChild', type: 'Tree' })

    parent.addChild(child)
    parent.addChild(secondChild)
    secondChild.addChild(grandChild)

    const found = findNode(grandChild?.id, parent)

    expect(found).toBe(grandChild)
  })
  it('can remove child', () => {
    const parent = new NodeEntity({ id: 'parent', type: 'Tree' })
    const child = new NodeEntity({ id: 'child', type: 'Tree' })
    const secondChild = new NodeEntity({ id: 'secondChild', type: 'Tree' })

    parent.addChild(child)
    parent.addChild(secondChild)

    parent.removeChild(secondChild)

    const { children } = parent

    expect(children).toEqual([child])
  })

  it('can move a node to another parent', () => {
    const parent = new NodeEntity({ id: 'parent', type: 'Tree' })
    const child = new NodeEntity({ id: 'child', type: 'Tree' })
    const grandChild = new NodeEntity({ id: 'grandChild', type: 'Tree' })
    const grandGrandChild = new NodeEntity({
      id: 'grandgrandChild',
      type: 'Tree',
    })

    parent.addChild(child)
    child.addChild(grandChild)
    grandChild.addChild(grandGrandChild)

    grandGrandChild.move(parent)

    const { children } = parent

    expect(children).toContain(child)
    expect(children).toContain(grandGrandChild)

    const { children: grandChildChildren } = grandChild

    expect(grandChildChildren).not.toContain(grandGrandChild)
  })

  it('can find root', () => {
    const root = new NodeEntity({ id: 'parent', type: 'Tree' })
    const child = new NodeEntity({ id: 'child', type: 'Tree' })
    const grandChild = new NodeEntity({ id: 'grandChild', type: 'Tree' })

    root.addChild(child)
    child.addChild(grandChild)

    expect(root.getRoot()).toBe(root)
    expect(grandChild.getRoot()).toBe(root)
  })
})
