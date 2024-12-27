'use client'

import type {
  IElementTreeViewDataNode,
  IRuntimeComponentModel,
} from '@codelab/frontend/abstract/application'
import type { Nullable } from '@codelab/shared/abstract/types'

import {
  isRuntimeComponent,
  runtimeComponentRef,
} from '@codelab/frontend/abstract/application'
import { isComponent } from '@codelab/frontend/abstract/domain'
import { useComponentService } from '@codelab/frontend-application-component/services'
import {
  useCloneElementService,
  useElementService,
} from '@codelab/frontend-application-element/services'
import { useCreateElementForm } from '@codelab/frontend-application-element/use-cases/create-element'
import { useDeleteElementModal } from '@codelab/frontend-application-element/use-cases/delete-element'
import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { useUser } from '@codelab/frontend-application-user/services'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { Key } from '@codelab/frontend-presentation-view/components/key'
import { Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
  const { builderService, runtimeElementService } = useApplicationStore()
  const { elementDomainService } = useDomainStore()
  const componentService = useComponentService()
  const { createPopover } = useElementService()
  const router = useRouter()
  const { appId, componentId, pageId } = useUrlPathParams()

  const cloneElementService = useCloneElementService({
    builderService,
    componentService,
  })

  const createElementForm = useCreateElementForm()
  const deleteElementModal = useDeleteElementModal()
  const user = useUser()

  const [contextMenuItemId, setContextMenuNodeId] =
    useState<Nullable<string>>(null)

  const element = elementDomainService.maybeElement(treeNode.element?.id)

  if (!element) {
    return null
  }

  const componentInstance = isComponent(element.renderType)

  const onAddChild = () => {
    createPopover.open(router, { appId, componentId, pageId })

    createElementForm.open({
      elementOptions:
        element.closestContainerNode.elements.map(mapElementOption),
      elementTree: element.closestContainerNode,
      selectedElement: element,
    })

    setContextMenuNodeId(null)
  }

  const onDelete = () => {
    deleteElementModal.open(element)
  }

  const onDuplicate = async () => {
    if (!user.auth0Id || !element.closestParentElement) {
      return
    }

    return cloneElementService.cloneElement(
      element,
      element.closestParentElement.current,
    )
  }

  const onConvert = async () => {
    if (!user.auth0Id) {
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

    runtimeComponent &&
      builderService.setSelectedNode(runtimeComponentRef(runtimeComponent))
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
