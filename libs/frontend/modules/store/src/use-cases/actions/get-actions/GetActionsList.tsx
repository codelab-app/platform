import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { IActionService, IStore } from '@codelab/shared/abstract/core'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { GetActionItem } from './GetActionItem'

export const GetActionsList = observer<{
  store: IStore
  actionService: IActionService
}>(({ actionService, store }) => {
  const [getActions] = useStatefulExecutor((id: string) =>
    actionService.getAll({ store: { id } }),
  )

  useEffect(() => {
    getActions(store.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.id])

  const actions = actionService.actionsList

  return (
    <List
      dataSource={actions}
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
