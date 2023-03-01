import { useUser } from '@auth0/nextjs-auth0'
import type {
  IElement,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { isComponentModel, RendererTab } from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/domain/element'
import { componentRef, useStore } from '@codelab/frontend/presenter/container'
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
    'createModal' | 'deleteModal' | 'cloneElement' | 'convertElementToComponent'
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
    cloneElement,
    convertElementToComponent,
    elementTree,
  }) => {
    const { builderService, componentService } = useStore()
    const { user } = useUser()
    const isComponentInstance = isComponentModel(element.renderType)

    const onAddChild = () => {
      return createModal.open({
        parentElement: elementRef(element.id),
      })
    }

    const onDelete = () => {
      return deleteModal.open(elementRef(element.id))
    }

    const onDuplicate = async () => {
      if (!user?.sub || !element.parent) {
        return
      }

      elementTree?.addElements(
        await cloneElement(element, element.parent.current),
      )
    }

    const onConvert = async () => {
      if (!user?.sub) {
        return
      }

      const createdElement = await convertElementToComponent(element, {
        auth0Id: user.sub,
      })

      if (createdElement) {
        elementTree?.addElements([createdElement])
      }
    }

    const onEditComponent = () => {
      if (!isComponentModel(element.renderType)) {
        return
      }

      builderService.setActiveTree(RendererTab.Component)

      const component = componentService.components.get(element.renderType.id)

      component &&
        builderService.selectComponentTreeNode(componentRef(component))
    }

    const menuItems = [
      {
        key: 'add-child',
        onClick: onAddChild,
        label: 'Add child',
      },
      {
        key: 'duplicate',
        onClick: onDuplicate,
        label: 'Duplicate',
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
        items={menuItems
          .filter((item) => !item.hide)
          .map((item) => ({
            ...item,
            hide: String(item.hide),
          }))}
        onBlur={onBlur}
        onClick={() => onClick?.()}
      />
    )
  },
)

ElementContextMenu.displayName = 'ElementContextMenu'
