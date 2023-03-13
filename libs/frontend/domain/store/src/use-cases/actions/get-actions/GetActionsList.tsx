import type { IActionService, IStore } from '@codelab/frontend/abstract/core'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import { GetActionItem } from './GetActionItem'

export const GetActionsList = observer<{
  actionService: IActionService
  store?: IStore
}>(({ actionService, store }) => {
  const { loading } = useAsync(
    async () => (storeId: string) => actionService.getAll(storeId),
    [store?.id],
  )

  const actions = actionService.actionsList

  return (
    <List
      dataSource={actions}
      loading={loading || !store}
      renderItem={(action) => (
        <GetActionItem
          action={action}
          actionService={actionService}
          key={action.id}
        />
      )}
      size="small"
    />
  )
})
