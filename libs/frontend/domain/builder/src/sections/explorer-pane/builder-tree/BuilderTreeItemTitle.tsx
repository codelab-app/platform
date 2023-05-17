import type { IPageNode } from '@codelab/frontend/abstract/core'
import {
  isComponentPageNode,
  isElementPageNode,
} from '@codelab/frontend/abstract/core'
import type { DataNode } from 'antd/lib/tree'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { BuilderDropHandler } from '../../../dnd/BuilderDropHandler'
import type { ComponentContextMenuProps } from '../ComponentContextMenu'
import { ComponentContextMenu } from '../ComponentContextMenu'
import type { ElementContextMenuProps } from '../ElementContextMenu'
import { ElementContextMenu } from '../ElementContextMenu'
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
    // Add CSS to disable hover if node is un-selectable
    if (isElementPageNode(node)) {
      return (
        <BuilderDropHandler element={node}>
          <ItemTitleStyle node={data}>
            <ElementContextMenu
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...elementContextMenuProps}
              element={node}
            />
          </ItemTitleStyle>
        </BuilderDropHandler>
      )
    }

    if (isComponentPageNode(node)) {
      return (
        <ItemTitleStyle node={data}>
          <ComponentContextMenu
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...componentContextMenuProps}
            component={node}
          />
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
