import { queryToTable } from './graph-to-table'
import { Collection } from '@codelab/shared/interface/collections'
import { GraphA } from '@codelab/shared/interface/graph-v2'
import { TableProps } from '@codelab/ui/antd'

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

    const transformed: Partial<TableProps<GraphA>> = {
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
          edges: [],
          vertices: [],
        },
        {
          key: '2',
          id: '2',
          label: 'My Second Graph',
          edges: [],
          vertices: [],
        },
      ],
    }

    expect(queryToTable(original)).toStrictEqual(transformed)
  })
})
