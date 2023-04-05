import type { IStore } from '@codelab/frontend/abstract/core'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { GetStateItem } from './GetStateItem'

export const GetStateList = observer<{ store: IStore }>(({ store }) => (
  <List
    dataSource={store.api.current.fields}
    renderItem={(field) => <GetStateItem field={field} />}
    size="small"
  />
))
