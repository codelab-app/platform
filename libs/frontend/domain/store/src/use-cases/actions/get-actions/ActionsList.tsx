import type { IStore } from '@codelab/frontend/abstract/core'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ActionItem } from './ActionItem'

export const ActionsList = observer<{ store: IStore }>(({ store }) => (
  <List
    dataSource={store.actions.map((action) => action.current)}
    renderItem={(action) => <ActionItem action={action} key={action.id} />}
    size="small"
  />
))
