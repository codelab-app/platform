import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WithActionService, WithStoreService } from '../../../store'
import { useActionTable } from './useActionTable'

type GetActionsTableProps = WithActionService & WithStoreService

export const GetActionsTable = observer<GetActionsTableProps>(
  ({ actionService }) => {
    const { columns, rowSelection, pagination } = useActionTable(actionService)

    return (
      <Table
        columns={columns}
        dataSource={actionService.actionsList}
        pagination={pagination}
        rowKey={(action) => action.id}
        rowSelection={rowSelection}
      />
    )
  },
)
