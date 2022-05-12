import { useUser } from '@auth0/nextjs-auth0'
import { PageType } from '@codelab/frontend/abstract/types'
import { elementRef } from '@codelab/frontend/modules/element'
import { Key } from '@codelab/frontend/view/components'
import {
  IElement,
  IElementService,
  IElementTree,
} from '@codelab/shared/abstract/core'
import { Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'

export type ElementContextMenuProps = {
  element: IElement
  onClick?: () => any
  onBlur?: () => any
  elementTree: IElementTree
} & Pick<
  IElementService,
  | 'createModal'
  | 'deleteModal'
  | 'duplicateElement'
  | 'convertElementToComponent'
>

/**
 * The right-click menu in the element tree
 */
export const ElementContextMenu = observer<ElementContextMenuProps>(
  ({
    element,
    onClick,
    onBlur,
    createModal,
    deleteModal,
    duplicateElement,
    convertElementToComponent,
    elementTree,
  }) => {
    const { push } = useRouter()
    const { user } = useUser()
    const isComponentInstance = !!element.instanceOfComponent
    const hideForRoot = elementTree.root?.id === element.id

    const onAddChild = () => {
      return createModal.open({
        parentElement: elementRef(element.id),
      })
    }

    const onDelete = () => {
      return deleteModal.open(elementRef(element.id))
    }

    const onDuplicate = () => {
      if (!user?.sub) {
        return
      }

      return duplicateElement(element, user.sub)
    }

    const onConvert = () => {
      if (!user?.sub) {
        return
      }

      return convertElementToComponent(element, user.sub)
    }

    const onEditComponent = () => {
      push({
        pathname: PageType.ComponentDetail,
        query: { componentId: element.instanceOfComponent?.id },
      })
    }

    return (
      <Menu
        css={tw`border border-gray-200 shadow-xl`}
        onBlur={onBlur}
        onClick={() => onClick?.()}
      >
        {!isComponentInstance && (
          <Menu.Item key="add-child" onClick={onAddChild}>
            Add child
          </Menu.Item>
        )}

        <Menu.Item hidden={hideForRoot} key="duplicate" onClick={onDuplicate}>
          Duplicate
        </Menu.Item>

        {isComponentInstance ? (
          <Menu.Item
            // hidden={hideForRoot}
            key="edit-component"
            onClick={onEditComponent}
          >
            Edit Component
          </Menu.Item>
        ) : (
          <Menu.Item
            hidden={hideForRoot}
            key="convert-component"
            onClick={onConvert}
          >
            Convert To Component
          </Menu.Item>
        )}

        <Menu.Item danger hidden={hideForRoot} key="delete" onClick={onDelete}>
          <span>Delete `{element.name}` </span>{' '}
          <span>
            <Key>del</Key> <Key>{'\u232B'}</Key>
          </span>
        </Menu.Item>
      </Menu>
    )
  },
)

ElementContextMenu.displayName = 'ElementContextMenu'
