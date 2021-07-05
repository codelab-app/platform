import {
  ElementNode,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Menu } from 'antd'
import React from 'react'

export interface ElementContextMenuProps {
  node: ElementNode
}

export const ElementContextMenu = ({ node }: ElementContextMenuProps) => {
  const { openCreateModal, openDeleteModal } = useCRUDModalForm(
    EntityType.PageElement,
  )

  return (
    <Menu>
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
