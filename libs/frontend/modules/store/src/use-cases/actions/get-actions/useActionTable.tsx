import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { IAction, IActionService } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { Switch, TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { actionRef } from '../../../store'
import { ActionColumn } from './columns'

type ActionRow = Omit<IAction, 'resource'> & { resource: Nullish<string> }

export const useActionTable = (actionService: IActionService) => {
  const columns: Array<TableColumnProps<ActionRow>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Resource',
      dataIndex: 'resource',
      key: 'resource',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('resource'),
    },
    {
      title: 'Run on init',
      dataIndex: 'runOnInit',
      key: 'runOnInit',
      onHeaderCell: headerCellProps,
      render: (text, action) => <Switch checked={action.runOnInit} disabled />,
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

  const rowSelection: TableRowSelection<ActionRow> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<ActionRow>) => {
      actionService.setSelectedActions(selectedRows.map((a) => actionRef(a.id)))
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination }
}
