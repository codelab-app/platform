import { findNode } from './tree-factory'
import { NodeEntity } from '@codelab/alpha/core/node'
import { AtomType } from '@codelab/frontend'

describe('Node', () => {
  it('can add a child', () => {
    const parent = new NodeEntity({
      id: 'parent',
      type: AtomType.ReactFragment,
    })
    const child = new NodeEntity({ id: 'child', type: AtomType.ReactFragment })

    expect(parent.hasChildren()).toBeFalsy()

    parent.addChild(child)

    expect(parent.hasChildren()).toBeTruthy()

    const { children } = parent

    expect(children).toContain(child)
  })

  it('can add a second child', () => {
    const parent = new NodeEntity({
      id: 'parent',
      type: AtomType.ReactFragment,
    })
    const child = new NodeEntity({ id: 'child', type: AtomType.ReactFragment })
    const secondChild = new NodeEntity({
      id: 'secondChild',
      type: AtomType.ReactFragment,
    })

    parent.addChild(child)
    parent.addChild(secondChild)

    const { children } = parent

    expect(children).toEqual([child, secondChild])
  })

  it('can find a node', () => {
    const parent = new NodeEntity({
      id: 'parent',
      type: AtomType.ReactFragment,
    })
    const child = new NodeEntity({ id: 'child', type: AtomType.ReactFragment })
    const secondChild = new NodeEntity({
      id: 'secondChild',
      type: AtomType.ReactFragment,
    })
    const grandChild = new NodeEntity({
      id: 'grandChild',
      type: AtomType.ReactFragment,
    })

    parent.addChild(child)
    parent.addChild(secondChild)
    secondChild.addChild(grandChild)

    const found = findNode(grandChild?.id, parent)

    expect(found).toBe(grandChild)
  })
})
