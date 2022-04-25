import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { IAction, IActionService } from '@codelab/shared/abstract/core'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { actionRef } from '../../../store'
import { ActionColumn } from './columns'

export const useActionTable = (actionService: IActionService) => {
  const columns: Array<TableColumnProps<IAction>> = [
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

  const rowSelection: TableRowSelection<IAction> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<IAction>) => {
      actionService.setSelectedActions(selectedRows.map((a) => actionRef(a.id)))
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination }
}
