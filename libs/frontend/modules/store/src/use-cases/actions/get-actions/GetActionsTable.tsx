import { useAsyncState } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useCurrentStoreId } from '../../../hooks'
import { ActionStore } from '../../../store'
import { ActionCellData } from './columns'
import { useActionTable } from './useActionTable'

export interface GetActionsTableProps {
  actionStore: ActionStore
}

export const GetActionsTable = observer<GetActionsTableProps>(
  ({ actionStore }) => {
    const { columns, rowSelection, pagination } = useActionTable(actionStore)
    const storeId = useCurrentStoreId()

    const [getActions, { isLoading }] = useAsyncState(() =>
      actionStore.getAll({ store: { id: storeId } }),
    )

    useEffect(() => {
      getActions()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const actionsList = actionStore.actionsList

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
