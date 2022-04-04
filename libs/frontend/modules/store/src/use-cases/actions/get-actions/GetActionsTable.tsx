import { useCurrentStoreId } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { WithActionService, WithStoreService } from '../../../store'
import { useActionTable } from './useActionTable'

type GetActionsTableProps = WithActionService & WithStoreService

export const GetActionsTable = observer<GetActionsTableProps>(
  ({ actionService }) => {
    const { columns, rowSelection, pagination } = useActionTable(actionService)
    const storeId = useCurrentStoreId()

    const [getActions] = useLoadingState((id: string) =>
      actionService.getAll({ store: { id } }),
    )

    useEffect(() => {
      if (storeId) {
        getActions(storeId)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeId])

    return (
      <Table
        columns={columns}
        dataSource={actionService.actionsList(storeId)}
        pagination={pagination}
        rowKey={(action) => action.id}
        rowSelection={rowSelection}
      />
    )
  },
)
