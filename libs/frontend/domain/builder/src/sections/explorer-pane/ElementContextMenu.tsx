import { useUser } from '@auth0/nextjs-auth0'
import type {
  IElement,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import {
  elementRef,
  isComponentInstance,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import {
  elementTreeRef,
  mapElementOption,
} from '@codelab/frontend/domain/element'
import { useStore } from '@codelab/frontend/presenter/container'
import { Key } from '@codelab/frontend/view/components'
import { Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export interface ContextMenuProps {
  onBlur?(): unknown
  onClick?(): unknown
}

export type ElementContextMenuProps = ContextMenuProps &
  Pick<
    IElementService,
    'cloneElement' | 'convertElementToComponent' | 'createModal' | 'deleteModal'
  > & {
    element: IElement
    elementTree: IElementTree | null
  }

/**
 * The right-click menu in the element tree
 */
export const ElementContextMenu = observer<ElementContextMenuProps>(
  ({
    convertElementToComponent,
    createModal,
    deleteModal,
    element,
    elementTree,
    onBlur,
    onClick,
  }) => {
    const { builderService, componentService } = useStore()
    const { user } = useUser()
    const componentInstance = isComponentInstance(element.renderType)

    const onAddChild = () => {
      if (!elementTree) {
        return
      }

      return createModal.open({
        elementOptions: elementTree.elements.map(mapElementOption),
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
    }

    const onConvert = async () => {
      if (!user?.sub) {
        return
      }

      await convertElementToComponent(element, {
        auth0Id: user.sub,
      })
    }

    const onEditComponent = () => {
      if (!isComponentInstance(element.renderType)) {
        return
      }

      builderService.setActiveTab(RendererTab.Component)

      const component = componentService.components.get(element.renderType.id)

      component && builderService.selectComponentNode(component)
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
