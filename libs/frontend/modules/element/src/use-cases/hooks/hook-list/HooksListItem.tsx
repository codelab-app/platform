import { List } from 'antd'
import tw from 'twin.macro'
import { RemoveHookFromElementButton } from '../remove-hook-from-element'
import { HooksListItemDescription } from './HooksListItemDescription'
import { HooksListItemProps } from './types'

export const HooksListItem = ({ hook }: HooksListItemProps) => {
  const actions = [
    <RemoveHookFromElementButton entity={hook} hookId={hook.id} key="delete" />,
  ]

  return (
    <List.Item
      actions={actions}
      css={tw`flex flex-row items-center justify-between`}
    >
      <List.Item.Meta
        description={<HooksListItemDescription hook={hook} />}
        title={hook.type}
      />
    </List.Item>
  )
}
