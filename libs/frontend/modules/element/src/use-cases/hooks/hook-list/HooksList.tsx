import { List } from 'antd'
import React from 'react'
import { HooksListItem } from './HooksListItem'
import { HooksListProps } from './types'

export const HooksList = ({ element }: HooksListProps) => {
  return (
    <List
      dataSource={element.hooks}
      renderItem={(hook) => <HooksListItem hook={hook} />}
    />
  )
}

HooksList.displayName = 'HooksList'
