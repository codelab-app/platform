import { useUser } from '@auth0/nextjs-auth0'
import {
  IElement,
  IElementService,
  IElementTree,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import { componentRef } from '@codelab/frontend/domain/component'
import { elementRef } from '@codelab/frontend/domain/element'
import { useStore } from '@codelab/frontend/presenter/container'
import { Key } from '@codelab/frontend/view/components'
import { Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export interface ContextMenuProps {
  onClick?: () => unknown
  onBlur?: () => unknown
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
    const { builderService, componentService } = useStore()
    const { user } = useUser()
    const isComponentInstance = Boolean(element.renderComponentType)

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

      return duplicateElement(element, user.sub, elementTree)
    }

    const onConvert = () => {
      if (!user?.sub) {
        return
      }

      return convertElementToComponent(element, user.sub, elementTree)
    }

    const onEditComponent = () => {
      if (!element.renderComponentType) {
        return
      }

      builderService.setActiveTree(RendererTab.Component)

      const component = componentService.components.get(
        element.renderComponentType.id.toString(),
      )

      component &&
        builderService.selectComponentTreeNode(componentRef(component))
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
        hide: element.isRoot,
      },
      {
        key: 'edit-component',
        onClick: onEditComponent,
        label: 'Edit Component',
        hide: !isComponentInstance,
      },
      {
        disabled: element.isRoot,
        key: 'convert-component',
        onClick: onConvert,
        label: 'Convert To Component',
        hide: isComponentInstance || element.isRoot,
      },
      {
        danger: true,
        hide: element.isRoot,
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
