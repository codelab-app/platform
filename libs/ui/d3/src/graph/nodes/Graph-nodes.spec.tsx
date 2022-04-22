import { render } from '@testing-library/react'
import React from 'react'
import { BasicGraph } from '../stories/Graph.stories'

describe('D3 Graph Nodes', () => {
  it('should render a group of nodes', async () => {
    const { container } = render(<BasicGraph />)
    const nodes = container.querySelectorAll('g.Node')

    expect(nodes).toHaveLength(5)

    const A = container.querySelectorAll('g.Node.Node--A')
    const B = container.querySelectorAll('g.Node.Node--B')
    const C = container.querySelectorAll('g.Node.Node--C')
    const D = container.querySelectorAll('g.Node.Node--D')
    const E = container.querySelectorAll('g.Node.Node--E')

    expect(A).toHaveLength(1)
    expect(B).toHaveLength(1)
    expect(C).toHaveLength(1)
    expect(D).toHaveLength(1)
    expect(E).toHaveLength(1)
  })

  it('should render a text node', async () => {
    const { findByText } = render(<BasicGraph />)
    const A = await findByText('A')

    expect(A.nodeName).toBe('text')
    expect(Object.values(A.classList)).toEqual(
      expect.arrayContaining(['Node-text', 'Node-text--A']),
    )
  })

  // it('should render links', async () => {
  //   const { findByText } = render(<BasicGraph />)

  //   const A_B = await findByText('A_B')
  //   const A_C = await findByText('A_C')
  //   const C_D = await findByText('C_D')
  //   const C_E = await findByText('C_E')

  //   console.log(nodeA.nodeName)

  //   screen.debug(nodeA)
  // })
})
