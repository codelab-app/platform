import type { IElementModel } from '@codelab/frontend/abstract/domain'

import { List } from 'antd'

import { HooksListItem } from './hooksListItem.hook'

export interface HooksListProps {
  element: IElementModel
}

export const HooksList = ({ element }: HooksListProps) => {
  return (
    <List
      dataSource={element.hooks}
      renderItem={(hook) => <HooksListItem hook={hook} />}
    />
  )
}

HooksList.displayName = 'HooksList'
