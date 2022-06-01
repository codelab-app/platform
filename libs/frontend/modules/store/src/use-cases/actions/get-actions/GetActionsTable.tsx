import {
  ACTION_SERVICE,
  STORE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { IStore } from '@codelab/shared/abstract/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useActionTable } from './useActionTable'

export const GetActionsTable = observer<
  WithServices<ACTION_SERVICE | STORE_SERVICE> & { store: IStore }
>(({ actionService, store }) => {
  const { columns, rowSelection, pagination } = useActionTable(actionService)

  const [getActions] = useStatefulExecutor((id: string) =>
    actionService.getAll({ store: { id } }),
  )

  useEffect(() => {
    getActions(store.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.id])

  const actions = actionService.actionsList(store.id).map((x) => ({
    name: x.name,
    body: x.body,
    config: x.config,
    runOnInit: x.runOnInit,
    id: x.id,
    storeId: x.storeId,
    resource: x.resource?.maybeCurrent?.name,
  }))

  return (
    <Table
      columns={columns}
      dataSource={actions}
      pagination={pagination}
      rowKey={(action) => action.id}
      rowSelection={rowSelection}
    />
  )
})
