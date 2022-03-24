import { AtomType, IComponent } from '@codelab/shared/abstract/core'
import { TableColumnProps } from 'antd'
import tw from 'twin.macro'
import { ActionColumn } from './ActionColumn'
import { NameColumn } from './NameColumn'
import { ResouceTypeColumnColumn } from './ResouceTypeColumnColumn'

const headerCellProps = () => ({
  style: tw`font-semibold text-gray-900`,
})

export const columns: Array<TableColumnProps<IComponent>> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    onHeaderCell: headerCellProps
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    onHeaderCell: headerCellProps,
    render: (type: AtomType) => <ResouceTypeColumnColumn type={type} />,
  },
  {
    title: 'Action',
    key: 'action',
    onHeaderCell: headerCellProps,
    width: 100,
    render: (_, resource) => <ActionColumn resource={resource} />,
  },
]
