import BorderOuterOutlined from '@ant-design/icons/BorderOuterOutlined'
import {
  type IElementTreeViewDataNode,
  IRuntimeNodeType,
} from '@codelab/frontend/abstract/application'
import { CuiTreeItem } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ElementContextMenu } from '../ElementContextMenu'
import { ElementTreeItemElementTitle } from './ElementTreeItemElementTitle'

export const ElementTreeItemTitle = observer<{
  data: IElementTreeViewDataNode
}>(({ data }) => {
  return data.type === IRuntimeNodeType.Element ? (
    // Add CSS to disable hover if node is un-selectable
    <ElementContextMenu treeNode={data}>
      <ElementTreeItemElementTitle treeNode={data} />
    </ElementContextMenu>
  ) : (
    <CuiTreeItem
      primaryTitle={data.primaryTitle}
      secondaryTitle={data.secondaryTitle}
    />
  )
})
