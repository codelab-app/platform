import { useUser } from '@auth0/nextjs-auth0/client'
import type { IElement, IElementService } from '@codelab/frontend/abstract/core'
import {
  elementRef,
  elementTreeRef,
  isComponentInstance,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import { FormNames } from '@codelab/frontend/abstract/types'
import { mapElementOption } from '@codelab/frontend/domain/element'
import { useCui } from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { Key } from '@codelab/frontend/presentation/view'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'

export interface ContextMenuProps {
  onBlur?(): unknown
  onClick?(): unknown
}

export type ElementContextMenuProps = ContextMenuProps &
  Pick<
    IElementService,
    'cloneElement' | 'convertElementToComponent' | 'createForm' | 'deleteModal'
  > & {
    element: IElement
  }

/**
 * The right-click menu in the element tree
 */
export const ElementContextMenu = observer<
  React.PropsWithChildren<ElementContextMenuProps>
>(
  ({
    children,
    cloneElement,
    convertElementToComponent,
    createForm,
    deleteModal,
    element,
  }) => {
    const { builderService, componentService } = useStore()
    const { user } = useUser()
    const { popover } = useCui()
    const componentInstance = isComponentInstance(element.renderType)

    const [contextMenuItemId, setContextMenuNodeId] =
      useState<Nullable<string>>(null)

    const onAddChild = () => {
      popover.open(FormNames.CreateElement)

      createForm.open({
        elementOptions:
          element.closestContainerNode.elements.map(mapElementOption),
        elementTree: elementTreeRef(element.closestContainerNode.id),
        selectedElement: elementRef(element.id),
      })
      setContextMenuNodeId(null)
    }

    const onDelete = () => {
      return deleteModal.open(elementRef(element.id))
    }

    const onDuplicate = async () => {
      if (!user?.sub || !element.closestParent) {
        return
      }

      return cloneElement(element, element.closestParent)
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
      <Dropdown
        menu={{
          items: menuItems
            .filter((item) => !item.hide)
            .map((item) => ({
              ...item,
              hide: String(item.hide),
            })),
        }}
        onOpenChange={(visible) => {
          setContextMenuNodeId(visible ? element.id : null)
        }}
        open={contextMenuItemId === element.id}
        trigger={['contextMenu']}
      >
        <div>{children}</div>
      </Dropdown>
    )
  },
)
