import { List } from 'antd'
import tw from 'twin.macro'
import { RemoveHookFromElementButton } from '../remove-hook-from-element'
import { HooksListItemDescription } from './HooksListItemDescription'
import { HooksListItemProps } from './types'

export const HooksListItem = ({ hook }: HooksListItemProps) => {
  const actions = [
    <RemoveHookFromElementButton
      key={'delete'}
      hookId={hook.id}
      entity={hook}
    />,
  ]

  return (
    <List.Item
      css={tw`flex flex-row items-center justify-between`}
      actions={actions}
    >
      <List.Item.Meta
        title={hook.type}
        description={<HooksListItemDescription hook={hook} />}
      />
    </List.Item>
  )
}
