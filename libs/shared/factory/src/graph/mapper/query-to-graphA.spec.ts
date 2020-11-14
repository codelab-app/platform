import { queryToGraphA } from './query-to-graphA'
import { Collection } from '@codelab/shared/interface/collections'
import { GraphA } from '@codelab/shared/interface/graph-v2'
import { GraphsQueryResult } from '@codelab/state/apollo'

describe('Graph mapper', () => {
  it('maps from query results to GraphA', () => {
    const original: Partial<GraphsQueryResult> = {
      data: {
        graph: [
          {
            __typename: 'graph',
            id: '1',
            label: 'My Graph',
            edges: [],
            vertices: [],
          },
          {
            __typename: 'graph',
            id: '2',
            label: 'My Second Graph',
            edges: [],
            vertices: [],
          },
        ],
      },
    }

    const transformed: Collection<GraphA> = {
      data: [
        {
          id: '1',
          label: 'My Graph',
          edges: [],
          vertices: [],
        },
        {
          id: '2',
          label: 'My Second Graph',
          edges: [],
          vertices: [],
        },
      ],
    }

    expect(queryToGraphA(original)).toStrictEqual(transformed)
  })
})
