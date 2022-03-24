import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useCurrentStoreId } from '../../../hooks'
import { ActionService } from '../../../store'
import { ActionCellData } from './columns'
import { useActionTable } from './useActionTable'

export interface GetActionsTableProps {
  actionService: ActionService
}

export const GetActionsTable = observer<GetActionsTableProps>(
  ({ actionService }) => {
    const { columns, rowSelection, pagination } = useActionTable(actionService)
    const storeId = useCurrentStoreId()

    const [getActions, { isLoading }] = useLoadingState(() =>
      actionService.getAll({ store: { id: storeId } }),
    )

    useEffect(() => {
      getActions()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const actionsList = actionService.actionsList

    const actionsData: Array<ActionCellData> = actionsList?.map((a) => ({
      id: a.id,
      name: a.name,
      body: a.body,
    }))

    return (
      <Table
        columns={columns}
        dataSource={actionsData}
        loading={isLoading}
        pagination={pagination}
        rowKey={(action) => action.id}
        rowSelection={rowSelection}
      />
    )
  },
)
