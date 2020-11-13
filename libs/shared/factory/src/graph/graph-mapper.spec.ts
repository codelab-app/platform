import { graphQueryToGraphAMapper } from './graph-mapper'
import { GraphA } from '@codelab/shared/interface/graph-v2'
import { GraphsQueryResult } from '@codelab/state/apollo'

describe('Graph mapper', () => {
  it('maps from query results to GraphA', () => {
    const original: Partial<GraphsQueryResult> = {
      data: {
        graph: [
          {
            __typename: 'graph',
            id: 1,
            label: 'My Graph',
            edges: [],
            vertices: [],
          },
          {
            __typename: 'graph',
            id: 2,
            label: 'My Second Graph',
            edges: [],
            vertices: [],
          },
        ],
      },
    }

    const transformed: Array<GraphA> = [
      {
        id: 1,
        label: 'My Graph',
        edges: [],
        vertices: [],
      },
      {
        id: 2,
        label: 'My Second Graph',
        edges: [],
        vertices: [],
      },
    ]

    expect(graphQueryToGraphAMapper(original)).toStrictEqual(transformed)
  })
})
