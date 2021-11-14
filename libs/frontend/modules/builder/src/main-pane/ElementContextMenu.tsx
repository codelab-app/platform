import { IElement } from '@codelab/frontend/abstract/core'
import { elementActions } from '@codelab/frontend/modules/element'
import { Key } from '@codelab/frontend/view/components'
import { Menu } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import tw from 'twin.macro'

export interface ElementContextMenuProps {
  element: IElement
  onClick?: () => any
  onBlur?: () => any
}

/**
 * The right-click menu in the element tree
 */
export const ElementContextMenu = ({
  element,
  onClick,
  onBlur,
}: ElementContextMenuProps) => {
  const dispatch = useDispatch()

  const openCreateModal = () =>
    dispatch(elementActions.openCreateModal({ parentElementId: element.id }))

  const openDeleteModal = () =>
    dispatch(
      elementActions.openDeleteModal({
        deleteIds: [element.id],
        entity: element,
      }),
    )

  return (
    <Menu
      onBlur={onBlur}
      onClick={() => onClick?.()}
      css={tw`border border-gray-200 shadow-xl`}
    >
      <Menu.Item onClick={() => openCreateModal()} key="1">
        Add child
      </Menu.Item>
      <Menu.Item danger onClick={() => openDeleteModal()} key="2">
        <span>Delete `{element.name}` </span>{' '}
        <span>
          <Key>del</Key> <Key>{'\u232B'}</Key>
        </span>
      </Menu.Item>
    </Menu>
  )
}

ElementContextMenu.displayName = 'ElementContextMenu'
