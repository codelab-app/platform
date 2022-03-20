import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { actionRef, ActionStore } from '../../../store'
import { ActionColumn } from './columns'
import { ActionCellData } from './columns/types'

export const useActionTable = (actionStore: ActionStore) => {
  const columns: Array<TableColumnProps<ActionCellData>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('body'),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, action) => (
        <ActionColumn action={action} actionStore={actionStore} />
      ),
    },
  ]

  const rowSelection: TableRowSelection<ActionCellData> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<ActionCellData>) => {
      actionStore.setSelectedActions(selectedRows.map((a) => actionRef(a.id)))
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination }
}
