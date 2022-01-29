import { useGetTagGraphsQuery } from '@codelab/frontend/modules/tag'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { AtomFragment } from '../../graphql/Atom.fragment.graphql.gen'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { ActionColumn, PropsColumn, TagsColumn } from './columns'

const onLibraryFilter = (value: any, atom: AtomFragment): boolean => {
  const list = [atom.name, atom.type].map((x) => x.toLowerCase())
  const search = value.toString().toLowerCase()

  return list.some((x) => x.startsWith(search))
}

export const useAtomTable = () => {
  const { selectedIds } = useAtomState()
  const { setSelectedIds } = useAtomDispatch()
  const { data } = useGetTagGraphsQuery()
  const tagData = data?.getTagGraphs?.vertices || []

  const columns: Array<TableColumnProps<AtomFragment>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      onHeaderCell: headerCellProps,
      onFilter: onLibraryFilter,
      render: (tags) => <TagsColumn tagData={tagData} tags={tags} />,
    },
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
      render: (text, atom) => <ActionColumn atom={atom} />,
    },
  ]

  const rowSelection: TableRowSelection<AtomFragment> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<AtomFragment>) => {
      setSelectedIds({ selectedIds: selectedRows.map(({ id }) => id) })
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination, selectedIds }
}
