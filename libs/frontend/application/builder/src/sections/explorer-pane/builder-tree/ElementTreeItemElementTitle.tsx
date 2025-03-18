import type { IBuilderRouteContext } from '@codelab/frontend/abstract/types'

import BorderOuterOutlined from '@ant-design/icons/BorderOuterOutlined'
import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined'
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { type IElementTreeViewDataNode } from '@codelab/frontend/abstract/application'
import { IRouteType, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useValidatedUrlParams } from '@codelab/frontend-application-shared-store/router'
import { Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

const Toolbar = observer<{
  treeNode: IElementTreeViewDataNode
  context: IBuilderRouteContext
}>(({ context: { params, type }, treeNode }) => {
  const router = useRouter()
  const { createPopover } = useElementService()

  if (!treeNode.element) {
    return
  }

  const onClick = () => {
    if (type === IRouteType.Page) {
      createPopover.open(router, params)
    } else {
      createPopover.open(router, params)
    }
  }

  const items = [
    {
      cuiKey: UiKey.ElementToolbarItemCreate,
      icon: <PlusOutlined />,
      onClick,
      title: 'Add Child',
    },
  ]

  return <CuiTreeItemToolbar items={items} title="ElementTreeItemToolbar" />
})

export const ElementTreeItemElementTitle = observer<{
  treeNode: IElementTreeViewDataNode
  context: IBuilderRouteContext
}>(({ context, treeNode }) => {
  const { atomMeta, componentMeta, errorMessage, selectable = true } = treeNode

  const Icon = componentMeta ? (
    <CodeSandboxOutlined style={{ color: 'blue' }} />
  ) : atomMeta ? (
    <DeploymentUnitOutlined style={{ color: 'green' }} />
  ) : (
    <BorderOuterOutlined style={{ color: 'gray' }} />
  )

  const Tag = errorMessage ? (
    <Tooltip title={errorMessage}>
      <ExclamationCircleOutlined style={{ color: 'red' }} />
    </Tooltip>
  ) : null

  return (
    <CuiTreeItem
      icon={Icon}
      primaryTitle={treeNode.primaryTitle}
      secondaryTitle={treeNode.secondaryTitle}
      tag={Tag}
      toolbar={selectable && <Toolbar context={context} treeNode={treeNode} />}
      variant={errorMessage ? 'danger' : 'primary'}
    />
  )
})
