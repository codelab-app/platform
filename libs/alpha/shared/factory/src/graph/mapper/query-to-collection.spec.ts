import { queryToCollection } from './query-to-collection'
import { Collection } from '@codelab/alpha/shared/interface/collections'
import { GraphA } from '@codelab/alpha/shared/interface/graph-v2'
import { GraphsQueryResult } from '@codelab/alpha/state/apollo'

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

    expect(queryToCollection(original)).toStrictEqual(transformed)
  })
})
