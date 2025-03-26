'use client'

import type {
  IBuilderRouteContext,
  IElementTreeViewDataNode,
} from '@codelab/frontend/abstract/application'
import type { Nullable } from '@codelab/shared/abstract/types'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { isComponent } from '@codelab/frontend/abstract/domain'
import { useComponentService } from '@codelab/frontend-application-component/services'
import {
  useCloneElementService,
  useElementService,
} from '@codelab/frontend-application-element/services'
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
import { mergeDeep } from 'remeda'

export interface ContextMenuProps {
  onBlur?(): unknown
  onClick?(): unknown
}

export type ElementContextMenuProps = ContextMenuProps & {
  treeNode: IElementTreeViewDataNode
  context: IBuilderRouteContext
}

/**
 * The right-click menu in the element tree
 */
export const ElementContextMenu = observer<
  React.PropsWithChildren<ElementContextMenuProps>
>(({ children, context, treeNode }) => {
  const { builderService, runtimeElementService } = useApplicationStore()
  const { elementDomainService } = useDomainStore()
  const componentService = useComponentService()
  const { createPopover, deletePopover } = useElementService()
  const router = useRouter()

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
    createPopover.open(router, context)

    setContextMenuNodeId(null)
  }

  const onDelete = () => {
    deletePopover.open(
      router,
      mergeDeep(context, { params: { elementId: element.id } }),
    )
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
    if (!isComponent(element.renderType.current)) {
      return
    }

    router.push(
      RoutePaths.Component.builder({
        componentId: element.renderType.current.id,
      }),
    )
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
