'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import type {
  IElementTreeViewDataNode,
  IRuntimeComponentModel,
} from '@codelab/frontend/abstract/application'
import { isRuntimeComponent } from '@codelab/frontend/abstract/application'
import {
  elementRef,
  elementTreeRef,
  isComponent,
} from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useCui } from '@codelab/frontend/presentation/codelab-ui'
import { useComponentService } from '@codelab/frontend-application-component/services'
import { useCloneElementService } from '@codelab/frontend-application-element/services'
import { useCreateElementForm } from '@codelab/frontend-application-element/use-cases/create-element'
import { useDeleteElementModal } from '@codelab/frontend-application-element/use-cases/delete-element'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { Key } from '@codelab/frontend-presentation-view/components/key'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useBuilderService } from '../../services'

export interface ContextMenuProps {
  onBlur?(): unknown
  onClick?(): unknown
}

export type ElementContextMenuProps = ContextMenuProps & {
  treeNode: IElementTreeViewDataNode
}

/**
 * The right-click menu in the element tree
 */
export const ElementContextMenu = observer<
  React.PropsWithChildren<ElementContextMenuProps>
>(({ children, treeNode }) => {
  const { runtimeElementService } = useApplicationStore()
  const { elementDomainService } = useDomainStore()
  const builderService = useBuilderService()
  const componentService = useComponentService()

  const cloneElementService = useCloneElementService({
    builderService,
    componentService,
  })

  const createElementForm = useCreateElementForm()
  const deleteElementModal = useDeleteElementModal()
  const { user } = useUser()
  const { popover } = useCui()

  const [contextMenuItemId, setContextMenuNodeId] =
    useState<Nullable<string>>(null)

  const element = elementDomainService.maybeElement(treeNode.element?.id)

  if (!element) {
    return null
  }

  const componentInstance = isComponent(element.renderType)

  const onAddChild = () => {
    popover.open(MODEL_ACTION.CreateElement.key)

    createElementForm.open({
      elementOptions:
        element.closestContainerNode.elements.map(mapElementOption),
      elementTree: elementTreeRef(element.closestContainerNode.id),
      selectedElement: elementRef(element.id),
    })

    setContextMenuNodeId(null)
  }

  const onDelete = () => {
    deleteElementModal.open(element)
  }

  const onDuplicate = async () => {
    if (!user?.sub || !element.closestParentElement) {
      return
    }

    return cloneElementService.cloneElement(
      element,
      element.closestParentElement.current,
    )
  }

  const onConvert = async () => {
    if (!user?.sub) {
      return
    }

    const runtimeElement = runtimeElementService.runtimeElement(treeNode.key)

    await cloneElementService.convertElementToComponent(runtimeElement)
  }

  const onEditComponent = () => {
    if (!isComponent(element.renderType)) {
      return
    }

    const runtimeElement = runtimeElementService.runtimeElement(treeNode.key)

    const runtimeComponent = runtimeElement.children.find(
      (child): child is IRuntimeComponentModel =>
        isRuntimeComponent(child) &&
        child.component.id === element.renderType.id,
    )

    runtimeComponent && builderService.selectComponentNode(runtimeComponent)
  }

  const menuItems = [
    {
      hide: treeNode.selectable === false,
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
})
