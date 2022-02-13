import { IElement } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  useConvertElementToComponentMutation,
  useDuplicateElementMutation,
  useElementDispatch,
} from '@codelab/frontend/modules/element'
import { Key } from '@codelab/frontend/view/components'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
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
  const [convertToComponent] = useConvertElementToComponentMutation()
  const [createElement] = useDuplicateElementMutation()
  const { openCreateModal, openDeleteModal } = useElementDispatch()
  const onAddChild = () => openCreateModal({ parentElementId: element.id })
  const { push } = useRouter()

  const onDelete = () =>
    openDeleteModal({
      deleteIds: [element.id],
      entity: element,
    })

  const onDuplicate = () =>
    createElement({
      variables: { elementId: element.id },
    })

  const onConvert = () => {
    return convertToComponent({
      variables: { input: { elementId: element.id } },
    })
  }

  return (
    <Menu
      css={tw`border border-gray-200 shadow-xl`}
      onBlur={onBlur}
      onClick={() => onClick?.()}
    >
      <Menu.Item key="addchild" onClick={() => onAddChild()}>
        Add child
      </Menu.Item>
      <Menu.Item key="duplicate" onClick={() => onDuplicate()}>
        Duplicate
      </Menu.Item>
      {element.instanceOfComponent ? (
        <Menu.Item
          key="1"
          onClick={() =>
            push({
              pathname: PageType.ComponentDetail,
              query: { componentId: element.instanceOfComponent?.id },
            })
          }
        >
          Edit component
        </Menu.Item>
      ) : (
        <Menu.Item key="convert" onClick={() => onConvert()}>
          Convert to component
        </Menu.Item>
      )}
      <Menu.Item danger key="delete" onClick={() => onDelete()}>
        <span>Delete `{element.name}` </span>{' '}
        <span>
          <Key>del</Key> <Key>{'\u232B'}</Key>
        </span>
      </Menu.Item>
    </Menu>
  )
}

ElementContextMenu.displayName = 'ElementContextMenu'
