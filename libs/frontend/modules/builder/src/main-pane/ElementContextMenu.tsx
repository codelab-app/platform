import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { IElementVertex } from '@codelab/shared/core'
import { Menu } from 'antd'
import React from 'react'

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
        Delete `{element.name}`
      </Menu.Item>
    </Menu>
  )
}

ElementContextMenu.displayName = 'ElementContextMenu'
