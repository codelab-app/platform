import BorderOuterOutlined from '@ant-design/icons/BorderOuterOutlined'
import {
  type IElementTreeViewDataNode,
  type IRuntimeModel,
  isRuntimeElement,
} from '@codelab/frontend/abstract/application'
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
    'elementTree' | 'runtimeElement'
  >
  node: IRuntimeModel | null
}

export const ElementTreeItemTitle = observer<ElementTreeItemTitleProps>(
  ({ data, elementContextMenuProps, node }) => {
    // Add CSS to disable hover if node is un-selectable
    if (node && isRuntimeElement(node)) {
      return (
        <ElementContextMenu
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...elementContextMenuProps}
          runtimeElement={node}
          treeNode={data}
        >
          <ElementTreeItemElementTitle
            element={node.element.current}
            treeNode={data}
          />
        </ElementContextMenu>
      )
    }

    return (
      <CuiTreeItem
        icon={<BorderOuterOutlined style={{ color: 'gray' }} />}
        primaryTitle={data.primaryTitle}
        secondaryTitle={data.secondaryTitle}
      />
    )
  },
)
