import type { IHook } from '@codelab/frontend/abstract/core'
import { List } from 'antd'
import type { ReactNode } from 'react'
import { RemoveHookFromElementButton } from '../remove-hook-from-element'
import { HooksListItemDescription } from './hooksListItemDescription.hook'

export interface HooksListItemProps {
  hook: IHook
}

export const HooksListItem = ({ hook }: HooksListItemProps) => {
  const actions: Array<ReactNode> = [
    <RemoveHookFromElementButton entity={hook} hookId={hook.id} key="delete" />,
  ]

  return (
    <List.Item
      // actions={actions}
      className="flex flex-row items-center justify-between"
    >
      <List.Item.Meta
        description={<HooksListItemDescription hook={hook} />}
        title={hook.type}
      />
    </List.Item>
  )
}
