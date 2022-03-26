import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { WithActionService } from '../../../store'
import { useActionTable } from './useActionTable'

type GetActionsTableProps = WithActionService & {
  storeId: string
}

export const GetActionsTable = observer<GetActionsTableProps>(
  ({ actionService, storeId }) => {
    const { columns, rowSelection, pagination } = useActionTable(actionService)

    const [getActions, { isLoading }] = useLoadingState(() =>
      actionService.getAll({ store: { id: storeId } }),
    )

    useEffect(() => {
      getActions()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeId])

    return (
      <Table
        columns={columns}
        dataSource={actionService.actionsList}
        loading={isLoading}
        pagination={pagination}
        rowKey={(action) => action.id}
        rowSelection={rowSelection}
      />
    )
  },
)
