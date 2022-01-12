import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { AtomFragment } from '../../graphql/Atom.fragment.graphql.gen'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { ActionColumn, LibraryColumn, PropsColumn } from './columns'

const onLibraryFilter = (value: any, atom: AtomFragment): boolean => {
  const list = [atom.name, atom.type].map((x) => x.toLowerCase())
  const serach = value.toString().toLowerCase()

  return list.some((x) => x.startsWith(serach))
}

export const useAtomTable = () => {
  const { selectedIds } = useAtomState()
  const { setSelectedIds } = useAtomDispatch()

  const columns: Array<TableColumnProps<AtomFragment>> = [
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
