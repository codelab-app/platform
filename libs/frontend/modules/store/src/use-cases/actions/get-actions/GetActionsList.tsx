import { ACTION_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { IStore } from '@codelab/shared/abstract/core'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { GetActionItem } from './GetActionItem'

export const GetActionsList = observer<
  WithServices<ACTION_SERVICE> & { store: IStore }
>(({ actionService, store }) => {
  const [getActions] = useStatefulExecutor((id: string) =>
    actionService.getAll({ store: { id } }),
  )

  useEffect(() => {
    getActions(store.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.id])

  const actions = actionService.actionsList(store.id)

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
