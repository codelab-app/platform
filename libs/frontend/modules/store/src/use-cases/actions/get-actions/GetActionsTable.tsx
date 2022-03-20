import { useAsyncState } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ActionStore, StoreModel } from '../../../store'
import { ActionCellData } from './columns'
import { useActionTable } from './useActionTable'

export interface GetActionsTableProps {
  actionStore: ActionStore
  store: StoreModel
}

export const GetActionsTable = observer<GetActionsTableProps>(
  ({ actionStore, store }) => {
    const { columns, rowSelection, pagination } = useActionTable(actionStore)

    const [getActions, { isLoading }] = useAsyncState(() =>
      actionStore.getAll({ store: { id: store.id } }),
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
