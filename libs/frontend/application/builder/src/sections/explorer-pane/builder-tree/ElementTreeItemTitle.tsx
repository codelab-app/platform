import type { IBuilderRouteContext } from '@codelab/frontend/abstract/types'

import BorderOuterOutlined from '@ant-design/icons/BorderOuterOutlined'
import {
  type IElementTreeViewDataNode,
  IRuntimeNodeType,
} from '@codelab/frontend/abstract/application'
import { CuiTreeItem } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'

import { ElementContextMenu } from '../ElementContextMenu'
import { ElementTreeItemElementTitle } from './ElementTreeItemElementTitle'

export const ElementTreeItemTitle = observer<{
  data: IElementTreeViewDataNode
  context: IBuilderRouteContext
}>(({ context, data }) => {
  return data.type === IRuntimeNodeType.Element ? (
    <ElementContextMenu treeNode={data}>
      <ElementTreeItemElementTitle context={context} treeNode={data} />
    </ElementContextMenu>
  ) : (
    <CuiTreeItem
      icon={<BorderOuterOutlined />}
      primaryTitle={data.primaryTitle}
      secondaryTitle={data.secondaryTitle}
    />
  )
})
