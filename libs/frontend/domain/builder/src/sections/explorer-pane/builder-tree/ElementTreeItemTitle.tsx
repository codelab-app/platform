import type {
  IElementTreeViewDataNode,
  IPageNode,
} from '@codelab/frontend/abstract/core'
import { isElementPageNode } from '@codelab/frontend/abstract/core'
import { CuiTreeItem } from '@codelab/frontend/presentation//codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { BuilderDropHandler } from '../../../dnd/BuilderDropHandler'
import type { ElementContextMenuProps } from '../ElementContextMenu'
import { ElementContextMenu } from '../ElementContextMenu'
import { ElementTreeItemElementTitle } from './ElementTreeItemElementTitle'

interface ElementTreeItemTitleProps {
  data: IElementTreeViewDataNode
  elementContextMenuProps: Omit<
    ElementContextMenuProps,
    'element' | 'elementTree'
  >
  node: IPageNode | null
}

export const ElementTreeItemTitle = observer<ElementTreeItemTitleProps>(
  ({ data, elementContextMenuProps, node }) => {
    // Add CSS to disable hover if node is un-selectable
    if (isElementPageNode(node)) {
      return (
        <BuilderDropHandler element={node}>
          <ElementContextMenu
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...elementContextMenuProps}
            element={node}
          >
            <ElementTreeItemElementTitle element={node} treeNode={data} />
          </ElementContextMenu>
        </BuilderDropHandler>
      )
    }

    return (
      <CuiTreeItem
        primaryTitle={data.primaryTitle}
        secondaryTitle={data.secondaryTitle}
      />
    )
  },
)
