import { CytoscapeI, makeCytoscape } from './factory'

describe('Cytoscape factory', () => {
  it('creates a cytoscape object from input', () => {
    const input: CytoscapeI = {
      vertices: [{ id: 'v-A' }, { id: 'v-B' }, { id: 'v-C' }],
      edges: [
        { id: 'e-A', start: 'v-A', end: 'v-B' },
        { id: 'e-B', start: 'v-A', end: 'v-C' },
      ],
    }
    const cy = makeCytoscape(input)

    const vertices = cy.nodes().map((ele) => {
      return ele.id()
    })
    const edges = cy.edges().map((ele) => {
      return ele.id()
    })

    expect(vertices).toMatchObject(['v-A', 'v-B', 'v-C'])
    expect(edges).toMatchObject(['e-A', 'e-B'])
  })
})
