import {
  type IElementTreeViewDataNode,
  type IPageNode,
  isElement,
} from '@codelab/frontend/abstract/domain'
import { CuiTreeItem } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
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
    if (node && isElement(node)) {
      return (
        <ElementContextMenu
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...elementContextMenuProps}
          element={node}
          treeNode={data}
        >
          <ElementTreeItemElementTitle element={node} treeNode={data} />
        </ElementContextMenu>
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
