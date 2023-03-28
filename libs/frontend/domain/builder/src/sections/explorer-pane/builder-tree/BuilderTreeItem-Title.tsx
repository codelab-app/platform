import type { IPageNode } from '@codelab/frontend/abstract/core'
import {
  isComponentPageNode,
  isElementPageNode,
} from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Dropdown } from 'antd'
import type { DataNode } from 'antd/lib/tree'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { BuilderDropHandler } from '../../../dnd/BuilderDropHandler'
import type { ComponentContextMenuProps } from '../ComponentContextMenu'
import { ComponentContextMenu } from '../ComponentContextMenu'
import type { ElementContextMenuProps } from '../ElementContextMenu'
import { ElementContextMenu } from '../ElementContextMenu'
import { BuilderTreeItemComponentTitle } from './BuilderTreeItem-ComponentTitle'
import { BuilderTreeItemElementTitle } from './BuilderTreeItem-ElementTitle'
import { BuilderTreeItemOverlay } from './BuilderTreeItem-Overlay'
import { ItemTitleStyle } from './ItemTitleStyle'

interface BuilderTreeItemTitleProps {
  componentContextMenuProps: Omit<ComponentContextMenuProps, 'component'>
  data: DataNode
  elementContextMenuProps: Omit<
    ElementContextMenuProps,
    'element' | 'elementTree'
  >
  node: IPageNode | null
}

export const BuilderTreeItemTitle = observer<BuilderTreeItemTitleProps>(
  ({ componentContextMenuProps, data, elementContextMenuProps, node }) => {
    const { builderService, elementService } = useStore()

    const [contextMenuItemId, setContextMenuNodeId] =
      useState<Nullable<string>>(null)

    // Add CSS to disable hover if node is un-selectable
    if (isElementPageNode(node)) {
      const element = node

      return (
        <BuilderDropHandler element={element}>
          <ItemTitleStyle node={data}>
            <Dropdown
              onOpenChange={(visible) => {
                setContextMenuNodeId(visible ? element.id : null)
              }}
              open={contextMenuItemId === element.id}
              overlay={
                <BuilderTreeItemOverlay
                  ContextMenu={ElementContextMenu}
                  contextMenuProps={{
                    ...elementContextMenuProps,
                    element,
                  }}
                  node={node}
                  setContextMenuNodeId={setContextMenuNodeId}
                />
              }
              trigger={['contextMenu']}
            >
              <div>
                <BuilderTreeItemElementTitle element={element} />
              </div>
            </Dropdown>
          </ItemTitleStyle>
        </BuilderDropHandler>
      )
    }

    if (isComponentPageNode(node)) {
      const component = node

      return (
        <ItemTitleStyle node={data}>
          <Dropdown
            onOpenChange={(visible) => {
              setContextMenuNodeId(visible ? component.id : null)
            }}
            open={contextMenuItemId === component.id}
            overlay={
              <BuilderTreeItemOverlay
                ContextMenu={ComponentContextMenu}
                contextMenuProps={{
                  ...componentContextMenuProps,
                  component,
                }}
                node={node}
                setContextMenuNodeId={setContextMenuNodeId}
              />
            }
            trigger={['contextMenu']}
          >
            <div>
              <BuilderTreeItemComponentTitle
                builderService={builderService}
                component={component}
                elementService={elementService}
              />
            </div>
          </Dropdown>
        </ItemTitleStyle>
      )
    }

    return (
      <ItemTitleStyle node={data}>
        <>{data.title}</>
      </ItemTitleStyle>
    )
  },
)

BuilderTreeItemTitle.displayName = 'BuilderTreeItemTitle'
