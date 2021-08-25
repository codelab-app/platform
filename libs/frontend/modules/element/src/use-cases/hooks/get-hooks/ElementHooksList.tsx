import {
  ElementFragment,
  HookConfigFragment,
  HookFragment,
} from '@codelab/shared/codegen/graphql'
import { List } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { RemoveHookFromElementButton } from '../remove-hook-from-element'

export interface ElementHooksListProps {
  element: ElementFragment
}

export const ElementHooksList = ({ element }: ElementHooksListProps) => {
  return (
    <List
      dataSource={element.hooks}
      renderItem={(hook) => (
        <ElementHooksListItem hook={hook} element={element} />
      )}
    />
  )
}

const ElementHooksListItem = ({
  hook,
  element,
}: {
  hook: HookFragment
  element: ElementFragment
}) => (
  <List.Item
    css={tw`flex flex-row items-center justify-between`}
    actions={[
      <RemoveHookFromElementButton
        key={'delete'}
        hookId={hook.id}
        metadata={{ hook, element }}
      />,
    ]}
  >
    <List.Item.Meta
      title={hook.type}
      description={<ElementHooksListItemConfig {...hook.config} />}
    />
  </List.Item>
)

const ElementHooksListItemConfig = (config: HookConfigFragment) => {
  switch (config.__typename) {
    case 'QueryHookConfig':
      return (
        <span>
          {config.queryKey} - {config.method} - {config.url}
        </span>
      )
  }

  return null
}

ElementHooksList.displayName = 'ElementHooksList'
