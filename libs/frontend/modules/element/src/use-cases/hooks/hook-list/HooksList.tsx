import { IElement } from '@codelab/shared/abstract/core'
import { List } from 'antd'
import React from 'react'
import { HooksListItem } from './HooksListItem'

export type HooksListProps = {
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
