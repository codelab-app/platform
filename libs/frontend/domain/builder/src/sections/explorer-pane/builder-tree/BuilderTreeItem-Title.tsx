import type {
  IBuilderService,
  IElementService,
  IPageNode,
} from '@codelab/frontend/abstract/core'
import {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
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
  node: IPageNode | undefined
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
    if (node?.__nodeType === ELEMENT_NODE_TYPE) {
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
                  setContextMenuNodeId={setContextMenuNodeId}
                  type={ELEMENT_NODE_TYPE}
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

    if (node?.__nodeType === COMPONENT_NODE_TYPE) {
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
                setContextMenuNodeId={setContextMenuNodeId}
                type={COMPONENT_NODE_TYPE}
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
