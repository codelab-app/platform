import type { IActionService, IStore } from '@codelab/frontend/abstract/core'
import { useAsync } from '@react-hookz/web'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ActionItem } from './ActionItem'

export const ActionsList = observer<{
  actionService: IActionService
  store?: IStore
}>(({ actionService, store }) => {
  const [{ status }, getActions] = useAsync(async (storeId: string) =>
    actionService.getAll({ storeConnection: { node: { id: storeId } } }),
  )

  useEffect(() => {
    if (store?.id) {
      void getActions.execute(store.id)
    }
  }, [store?.id])

  const actions = actionService.actionsList

  return (
    <List
      dataSource={actions}
      loading={status === 'loading' || !store}
      renderItem={(action) => (
        <ActionItem
          action={action}
          actionService={actionService}
          key={action.id}
        />
      )}
      size="small"
    />
  )
})
