import {
  ACTION_SERVICE,
  STORE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { useCurrentStoreId } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useActionTable } from './useActionTable'

export const GetActionsTable = observer<
  WithServices<ACTION_SERVICE | STORE_SERVICE>
>(({ actionService }) => {
  const { columns, rowSelection, pagination } = useActionTable(actionService)
  const storeId = useCurrentStoreId()

  const [getActions] = useStatefulExecutor((id: string) =>
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
})
