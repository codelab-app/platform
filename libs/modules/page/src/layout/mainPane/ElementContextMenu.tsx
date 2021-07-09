import {
  ElementNode,
  EntityType,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import { Menu } from 'antd'
import React from 'react'

export interface ElementContextMenuProps {
  node: ElementNode
  onClick?: () => any
  onBlur?: () => any
}

export const ElementContextMenu = ({
  node,
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
    >
      <Menu.Item onClick={() => openCreateModal()} key="1">
        Add child
      </Menu.Item>
      <Menu.Item
        danger
        onClick={() => openDeleteModal([node.id], node)}
        key="2"
      >
        Delete `{node.name}`
      </Menu.Item>
    </Menu>
  )
}

ElementContextMenu.displayName = 'ElementContextMenu'
