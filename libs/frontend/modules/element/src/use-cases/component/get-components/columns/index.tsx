import { IComponent } from '@codelab/shared/abstract/core'
import { TableColumnProps } from 'antd'
import tw from 'twin.macro'
import { ActionColumn } from './ActionColumn'
import { NameColumn } from './NameColumn'

const headerCellProps = () => ({
  style: tw`font-semibold text-gray-900`,
})

export const getComponentsTableColumns: Array<TableColumnProps<IComponent>> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    onHeaderCell: headerCellProps,
    render: (_, component) => <NameColumn component={component} />,
  },
  {
    title: 'Action',
    key: 'action',
    onHeaderCell: headerCellProps,
    width: 100,
    render: (_, component) => <ActionColumn component={component} />,
  },
]
