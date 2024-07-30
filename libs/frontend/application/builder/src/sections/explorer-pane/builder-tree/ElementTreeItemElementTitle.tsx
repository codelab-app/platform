import BorderOuterOutlined from '@ant-design/icons/BorderOuterOutlined'
import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined'
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type { IElementTreeViewDataNode } from '@codelab/frontend/abstract/application'
import { elementRef, elementTreeRef } from '@codelab/frontend/abstract/domain'
import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useCreateElementForm } from '@codelab/frontend-application-element/use-cases/create-element'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import { Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

const Toolbar = observer<{ treeNode: IElementTreeViewDataNode }>(
  ({ treeNode }) => {
    const elementService = useElementService()
    const createElementForm = useCreateElementForm()
    const { popover } = useCui()

    if (!treeNode.element) {
      return
    }

    const element = elementService.getElement(treeNode.element.id)

    const onClick = () => {
      popover.open(MODEL_ACTION.CreateElement.key)
      createElementForm.open({
        elementOptions:
          element.closestContainerNode.elements.map(mapElementOption),
        elementTree: elementTreeRef(element.closestContainerNode.id),
        selectedElement: elementRef(element.id),
      })
    }

    const items = [
      {
        cuiKey:
          `${MODEL_ACTION.CreateElement.key}-${element.id}` as ModelActionKey,
        icon: <PlusOutlined />,
        onClick,
        title: 'Add Child',
      },
    ]

    return <CuiTreeItemToolbar items={items} title="ElementTreeItemToolbar" />
  },
)

export const ElementTreeItemElementTitle = observer<{
  treeNode: IElementTreeViewDataNode
}>(({ treeNode }) => {
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
      toolbar={selectable && <Toolbar treeNode={treeNode} />}
      variant={errorMessage ? 'danger' : 'primary'}
    />
  )
})
