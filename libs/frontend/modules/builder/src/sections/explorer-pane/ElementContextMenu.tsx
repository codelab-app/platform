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

export type ContextMenuProps = {
  onClick?: () => any
  onBlur?: () => any
}

export type ElementContextMenuProps = {
  element: IElement
  elementTree: IElementTree | null
} & ContextMenuProps &
  Pick<
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
    const isComponentInstance = Boolean(element.instanceOfComponent)
    const isRoot = !element.parentElement

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

      return convertElementToComponent(element, user.sub, elementTree)
    }

    const onEditComponent = () => {
      push({
        pathname: PageType.ComponentDetail,
        query: { componentId: element.instanceOfComponent?.id },
      })
    }

    const menuItems = [
      {
        key: 'add-child',
        onClick: onAddChild,
        label: 'Add child',
        // find a way to hide it instead of disabling
        hide: isComponentInstance,
      },
      {
        key: 'duplicate',
        onClick: onDuplicate,
        label: 'Duplicate',
        // find a way to hide it instead of disabling
        hide: isRoot,
      },
      {
        key: 'edit-component',
        onClick: onEditComponent,
        label: 'Edit Component',
        hide: !isComponentInstance,
      },
      {
        disabled: isRoot,
        key: 'convert-component',
        onClick: onConvert,
        label: 'Convert To Component',
        hide: isComponentInstance || isRoot,
      },
      {
        danger: true,
        hide: isRoot,
        key: 'delete',
        onClick: onDelete,
        label: (
          <>
            <span>Delete `{element.name}` </span>{' '}
            <span>
              <Key>del</Key> <Key>{'\u232B'}</Key>
            </span>
          </>
        ),
      },
    ]

    return (
      <Menu
        css={tw`border border-gray-200 shadow-xl`}
        items={menuItems.filter((x) => !x.hide)}
        onBlur={onBlur}
        onClick={() => onClick?.()}
      />
    )
  },
)

ElementContextMenu.displayName = 'ElementContextMenu'
