import { IElement } from '@codelab/frontend/abstract/core'
import {
  useCreateElementMutation,
  useElementDispatch,
} from '@codelab/frontend/modules/element'
import { Key } from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import { Menu } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { duplicateElementInput } from '../../utils/duplicateElementInput'

export interface ElementContextMenuProps {
  element: IElement
  tree: ElementTree
  onClick?: () => any
  onBlur?: () => any
}

/**
 * The right-click menu in the element tree
 */
export const ElementContextMenu = ({
  element,
  tree,
  onClick,
  onBlur,
}: ElementContextMenuProps) => {
  const [createElement] = useCreateElementMutation()
  const { openCreateModal, openDeleteModal } = useElementDispatch()
  const onAddChild = () => openCreateModal({ parentElementId: element.id })

  const onDelete = () =>
    openDeleteModal({
      deleteIds: [element.id],
      entity: element,
    })

  const onDuplicate = () => {
    return createElement({
      variables: {
        input: duplicateElementInput(element, tree),
      },
    })
  }

  return (
    <Menu
      onBlur={onBlur}
      onClick={() => onClick?.()}
      css={tw`border border-gray-200 shadow-xl`}
    >
      <Menu.Item onClick={() => onAddChild()} key="1">
        Add child
      </Menu.Item>
      <Menu.Item onClick={() => onDuplicate()} key="duplicate">
        Duplicate
      </Menu.Item>
      <Menu.Item danger onClick={() => onDelete()} key="2">
        <span>Delete `{element.name}` </span>{' '}
        <span>
          <Key>del</Key> <Key>{'\u232B'}</Key>
        </span>
      </Menu.Item>
    </Menu>
  )
}

ElementContextMenu.displayName = 'ElementContextMenu'
