import { render } from '@testing-library/react'
import React from 'react'
import { BasicGraph } from '../stories/Graph.stories'

describe('D3 Graph Nodes', () => {
  it('should render a group of links', async () => {
    const { container } = render(<BasicGraph />)
    const links = container.querySelectorAll('g.Link')

    expect(links).toHaveLength(4)

    const A_B = container.querySelector('g.Link.Link--A_B')
    const A_C = container.querySelector('g.Link.Link--A_C')
    const C_D = container.querySelector('g.Link.Link--C_D')
    const C_E = container.querySelector('g.Link.Link--C_E')

    expect(A_B).toBeTruthy()
    expect(A_C).toBeTruthy()
    expect(C_D).toBeTruthy()
    expect(C_E).toBeTruthy()
  })

  it('should render a link path', async () => {
    const { container } = render(<BasicGraph />)
    const paths = container.querySelectorAll('path.Link-path')

    expect(paths).toHaveLength(4)

    const A_B = container.querySelector('g.Link--A_B path.Link-path')
    const A_C = container.querySelector('g.Link--A_C path.Link-path')
    const C_D = container.querySelector('g.Link--C_D path.Link-path')
    const C_E = container.querySelector('g.Link--C_E path.Link-path')

    expect(A_B).toBeTruthy()
    expect(A_C).toBeTruthy()
    expect(C_D).toBeTruthy()
    expect(C_E).toBeTruthy()
  })
})
