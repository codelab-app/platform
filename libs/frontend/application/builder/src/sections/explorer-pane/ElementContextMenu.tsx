'use client'

import type { IElementTreeViewDataNode } from '@codelab/frontend/abstract/application'
import type { Nullable } from '@codelab/shared/abstract/types'

import { isComponent } from '@codelab/frontend/abstract/domain'
import { useComponentService } from '@codelab/frontend-application-component/services'
import {
  useCloneElementService,
  useElementService,
} from '@codelab/frontend-application-element/services'
import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { useUser } from '@codelab/frontend-application-user/services'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { Key } from '@codelab/frontend-presentation-view/components/key'
import { Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PageType } from '@codelab/frontend/abstract/types'

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
  const { createPopover, deletePopover } = useElementService()
  const router = useRouter()
  const { appId, componentId, pageId } = useUrlPathParams()
  const cloneElementService = useCloneElementService({
    builderService,
    componentService,
  })

  const user = useUser()

  const [contextMenuItemId, setContextMenuNodeId] =
    useState<Nullable<string>>(null)

  const element = elementDomainService.maybeElement(treeNode.element?.id)

  if (!element) {
    return null
  }

  const componentInstance = isComponent(element.renderType.current)

  const onAddChild = () => {
    createPopover.open(router, { appId, componentId, pageId })

    setContextMenuNodeId(null)
  }

  const onDelete = () => {
    deletePopover.open(router, {
      appId,
      componentId,
      elementId: element.id,
      pageId,
    })
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

  const onEditComponent = async () => {
    if (!isComponent(element.renderType.current)) {
      return
    }

    await router.push(
      PageType.ComponentBuilder({ componentId: element.renderType.current.id }),
    )

    // const runtimeElement = runtimeElementService.runtimeElement(treeNode.key)

    // const runtimeComponent = runtimeElement.children.find(
    //   (child): child is IRuntimeComponentModel =>
    //     isRuntimeComponent(child) &&
    //     child.component.id === element.renderType.id,
    // )

    // runtimeComponent &&
    //   builderService.setSelectedNode(runtimeComponentRef(runtimeComponent))
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
