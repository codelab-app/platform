import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { atomRef, AtomService } from '../../store'
import { ActionColumn, LibraryColumn, PropsColumn } from './columns'
import { AtomCellData } from './columns/types'

const onLibraryFilter = (value: any, atom: AtomCellData): boolean => {
  const list = [atom.name, atom.type].map((x) => x.toLowerCase())
  const search = value.toString().toLowerCase()

  return list.some((x) => x.startsWith(search))
}

export const useAtomTable = (atomService: AtomService) => {
  // const { data } = useGetTagGraphsQuery()
  // const tagTree = useTagTree(data?.tagGraphs)
  // const tagTreeData = tagTree.getAntdTrees()
  // const filterTreeData = makeFilterData(tagTreeData)

  const columns: Array<TableColumnProps<AtomCellData>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Library',
      dataIndex: 'library',
      key: 'library',
      onHeaderCell: headerCellProps,
      onFilter: onLibraryFilter,
      render: (library) => <LibraryColumn library={library} />,
    },
    // {
    //   title: 'Tags',
    //   dataIndex: 'tags',
    //   key: 'tags',
    //   filters: filterTreeData,
    //   filterMode: 'tree',
    //   filterSearch: true,
    //   onFilter: (value: string | number | boolean, atom: AtomCellData) => {
    //     return !!atom.tagIds?.includes(value.toString())
    //   },
    //   onHeaderCell: headerCellProps,
    //   render: (tags) => <TagsColumn tags={tags} />,
    // },
    {
      title: 'Props API',
      dataIndex: 'props',
      key: 'props',
      width: 100,
      onHeaderCell: headerCellProps,
      render: (_, atom) => <PropsColumn atom={atom} />,
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, atom) => (
        <ActionColumn atom={atom} atomService={atomService} />
      ),
    },
  ]

  const rowSelection: TableRowSelection<AtomCellData> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<AtomCellData>) => {
      atomService.setSelectedAtoms(selectedRows.map((a) => atomRef(a.id)))
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination }
}
