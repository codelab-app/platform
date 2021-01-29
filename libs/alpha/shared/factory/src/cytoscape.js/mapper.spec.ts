import { EdgeDefinition, NodeDefinition } from 'cytoscape'
import { cyMapEdges, cyMapVertices } from './mapper'
import { EdgeA, VertexA } from '@codelab/alpha/shared/interface/graph-v2'

describe.skip('Cytoscape mapper', () => {
  it('maps from VertexI to NodeDefinition', () => {
    const vertices: Array<Partial<VertexA>> = [
      {
        id: 'Root',
      },
      { id: 'A' },
    ]
    const expected: Array<NodeDefinition> = [
      {
        data: {
          id: 'Root',
        },
      },
      {
        data: {
          id: 'A',
        },
      },
    ]

    expect(cyMapVertices(vertices)).toMatchObject(expected)
  })

  it('maps from EdgeI to EdgeDefinition', () => {
    const edges: Array<EdgeA> = [
      {
        id: 'e-A',
        start: 'v-A',
        end: 'v-B',
      },
      {
        id: 'e-B',
        start: 'v-C',
        end: 'v-D',
      },
    ]
    const expected: Array<EdgeDefinition> = [
      {
        data: {
          id: 'e-A',
          source: 'v-A',
          target: 'v-B',
        },
      },
      {
        data: {
          id: 'e-B',
          source: 'v-C',
          target: 'v-D',
        },
      },
    ]

    expect(cyMapEdges(edges)).toMatchObject(expected)
  })
})
