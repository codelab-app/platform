import { collectionToTable } from './collection-to-table'
import { Collection } from '@codelab/alpha/shared/interface/collections'
import { GraphA } from '@codelab/alpha/shared/interface/graph-v2'
import { TableProps } from '@codelab/alpha/ui/antd'

describe('Graph mapper', () => {
  it('maps from Array<GraphA> to Table.dataSource & Table.columns', () => {
    const original: Collection<GraphA> = {
      data: [
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
    }

    const transformed: TableProps<Partial<GraphA>> = {
      columns: [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Label',
          dataIndex: 'label',
          key: 'label',
        },
        {
          title: 'Edges',
          dataIndex: 'edges',
          key: 'edges',
        },
        {
          title: 'Vertices',
          dataIndex: 'vertices',
          key: 'vertices',
        },
      ],
      dataSource: [
        {
          key: '1',
          id: '1',
          label: 'My Graph',
          // edges: [],
          // vertices: [],
        },
        {
          key: '2',
          id: '2',
          label: 'My Second Graph',
          // edges: [],
          // vertices: [],
        },
      ],
    }

    expect(collectionToTable(original)).toStrictEqual(transformed)
  })
})
