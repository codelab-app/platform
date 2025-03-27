import BorderOuterOutlined from '@ant-design/icons/BorderOuterOutlined'
import {
  type IBuilderRoute,
  type IElementTreeViewDataNode,
  IRuntimeNodeType,
} from '@codelab/frontend/abstract/application'
import { CuiTreeItem } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'

import { ElementContextMenu } from '../ElementContextMenu'
import { ElementTreeItemElementTitle } from './ElementTreeItemElementTitle'

export const ElementTreeItemTitle = observer<{
  data: IElementTreeViewDataNode
  context: IBuilderRoute
}>(({ context, data }) => {
  return data.type === IRuntimeNodeType.Element ? (
    <ElementContextMenu context={context} treeNode={data}>
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
