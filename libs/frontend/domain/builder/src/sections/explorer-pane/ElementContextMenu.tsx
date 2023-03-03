import { useUser } from '@auth0/nextjs-auth0'
import type {
  IElement,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  elementRef,
  isComponentInstance,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import { elementTreeRef } from '@codelab/frontend/domain/element'
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
    const componentInstance = isComponentInstance(element.renderType)

    const onAddChild = () => {
      if (!elementTree) {
        return
      }

      return createModal.open({
        elementTree: elementTreeRef(elementTree.id),
        selectedElement: elementRef(element.id),
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
      if (!isComponentInstance(element.renderType)) {
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
        label: 'Add child',
        onClick: onAddChild,
      },
      {
        hide: element.isRoot,
        key: 'duplicate',
        label: 'Duplicate',
        onClick: onDuplicate,
      },
      {
        hide: !componentInstance,
        key: 'edit-component',
        label: 'Edit Component',
        onClick: onEditComponent,
      },
      {
        disabled: element.isRoot,
        hide: componentInstance || element.isRoot,
        key: 'convert-component',
        label: 'Convert To Component',
        onClick: onConvert,
      },
      {
        danger: true,
        hide: element.isRoot,
        key: 'delete',
        label: (
          <>
            <span>Delete `{element.name}` </span>{' '}
            <span>
              <Key>del</Key> <Key>{'\u232B'}</Key>
            </span>
          </>
        ),
        onClick: onDelete,
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
