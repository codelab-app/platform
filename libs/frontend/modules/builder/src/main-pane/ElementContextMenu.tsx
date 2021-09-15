import {
  EntityType,
  Key,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { IElementVertex } from '@codelab/shared/abstract/core'
import { Menu } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export interface ElementContextMenuProps {
  element: IElementVertex
  onClick?: () => any
  onBlur?: () => any
}

export const ElementContextMenu = ({
  element,
  onClick,
  onBlur,
}: ElementContextMenuProps) => {
  const { openCreateModal, openDeleteModal } = useCrudModalForm(
    EntityType.Element,
  )

  return (
    <Menu
      onBlur={onBlur}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      css={tw`border border-gray-200 shadow-xl`}
    >
      <Menu.Item
        onClick={() => openCreateModal({ parentElementId: element.id })}
        key="1"
      >
        Add child
      </Menu.Item>
      <Menu.Item
        danger
        onClick={() => openDeleteModal([element.id], element)}
        key="2"
      >
        <span>Delete `{element.name}` </span>{' '}
        <span>
          <Key>del</Key> <Key>{'\u232B'}</Key>
        </span>
      </Menu.Item>
    </Menu>
  )
}

ElementContextMenu.displayName = 'ElementContextMenu'
