import { IElement } from '@codelab/frontend/abstract/core'
import { List } from 'antd'
import React from 'react'
import { HooksListItem } from './HooksListItem'

export interface HooksListProps {
  element: IElement
}

export const HooksList = ({ element }: HooksListProps) => {
  return (
    <List
      dataSource={element.hooks || []}
      renderItem={(hook) => <HooksListItem hook={hook} />}
    />
  )
}

HooksList.displayName = 'HooksList'
