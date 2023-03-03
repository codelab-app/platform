import type {
  IBuilderService,
  IElementService,
  IPageNode,
} from '@codelab/frontend/abstract/core'
import {
  isComponentPageNodeRef,
  isElementPageNodeRef,
} from '@codelab/frontend/abstract/core'
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
  node: IPageNode | null
  data: DataNode
  elementContextMenuProps: Omit<ElementContextMenuProps, 'element'>
  componentContextMenuProps: Omit<ComponentContextMenuProps, 'component'>
  elementService: IElementService
  builderService: IBuilderService
}

export const BuilderTreeItemTitle = observer<BuilderTreeItemTitleProps>(
  ({
    node,
    data,
    elementContextMenuProps,
    componentContextMenuProps,
    elementService,
    builderService,
  }) => {
    const [contextMenuItemId, setContextMenuNodeId] =
      useState<Nullable<string>>(null)

    // Add CSS to disable hover if node is un-selectable
    if (isElementPageNodeRef(node)) {
      const element = node.current

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

    if (isComponentPageNodeRef(node)) {
      const component = node.current

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
