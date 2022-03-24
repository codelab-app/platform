import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { actionRef, ActionService } from '../../../store'
import { ActionColumn } from './columns'
import { ActionCellData } from './columns/types'

export const useActionTable = (actionService: ActionService) => {
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
        <ActionColumn action={action} actionService={actionService} />
      ),
    },
  ]

  const rowSelection: TableRowSelection<ActionCellData> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<ActionCellData>) => {
      actionService.setSelectedActions(selectedRows.map((a) => actionRef(a.id)))
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination }
}
