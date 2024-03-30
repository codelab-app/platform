import { useUser } from '@auth0/nextjs-auth0/client'
import type {
  ICloneElementService,
  IElementService,
  IElementTreeViewDataNode,
  IRuntimeComponentModel,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import {
  isRuntimeComponent,
  RendererTab,
} from '@codelab/frontend/abstract/application'
import {
  elementRef,
  elementTreeRef,
  isComponent,
} from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { mapElementOption } from '@codelab/frontend/domain/element'
import { useCui } from '@codelab/frontend/presentation/codelab-ui'
import { Key } from '@codelab/frontend/presentation/view'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'

export interface ContextMenuProps {
  onBlur?(): unknown
  onClick?(): unknown
}

interface ElementContextMenu {
  cloneElement: ICloneElementService['cloneElement']
  convertElementToComponent: ICloneElementService['convertElementToComponent']
  createForm: IElementService['createForm']
  deleteModal: IElementService['deleteModal']
  runtimeElement: IRuntimeElementModel
  treeNode?: IElementTreeViewDataNode
}

export type ElementContextMenuProps = ContextMenuProps & ElementContextMenu

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
    runtimeElement,
    treeNode,
  }) => {
    const { builderService } = useStore()
    const { user } = useUser()
    const { popover } = useCui()
    const element = runtimeElement.element.current
    const componentInstance = isComponent(element.renderType)

    const [contextMenuItemId, setContextMenuNodeId] =
      useState<Nullable<string>>(null)

    const onAddChild = () => {
      popover.open(MODEL_ACTION.CreateElement.key)

      createForm.open({
        elementOptions:
          element.closestContainerNode.elements.map(mapElementOption),
        elementTree: elementTreeRef(element.closestContainerNode.id),
        selectedElement: elementRef(element.id),
      })
      setContextMenuNodeId(null)
    }

    const onDelete = () => {
      return deleteModal.open(elementRef(element))
    }

    const onDuplicate = async () => {
      if (!user?.sub || !element.closestParentElement) {
        return
      }

      return cloneElement(element, element.closestParentElement.current)
    }

    const onConvert = async () => {
      if (!user?.sub) {
        return
      }

      await convertElementToComponent(runtimeElement)
    }

    const onEditComponent = () => {
      if (!isComponent(element.renderType)) {
        return
      }

      builderService.setActiveTab(RendererTab.Component)

      const runtimeComponent = runtimeElement.children.find(
        (child): child is IRuntimeComponentModel =>
          isRuntimeComponent(child) &&
          child.component.id === element.renderType.id,
      )

      runtimeComponent && builderService.selectComponentNode(runtimeComponent)
    }

    const menuItems = [
      {
        hide: treeNode?.selectable === false,
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
