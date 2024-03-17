import ApiOutlined from '@ant-design/icons/ApiOutlined'
import CodeOutlined from '@ant-design/icons/CodeOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import type {
  IActionNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { actionRef } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { IActionKind } from '@codelab/shared/abstract/core'
import React from 'react'

interface ActionsTreeItemProps {
  data: ITreeNode<IActionNodeData>
}

export const ActionsTreeItem = ({ data }: ActionsTreeItemProps) => {
  const { actionService } = useStore()
  const { popover } = useCui()

  const onDelete = () => {
    actionService.deleteModal.open(actionRef(data.extraData.node))
  }

  const onEdit = () => {
    actionService.updateForm.open(actionRef(data.extraData.node))
    popover.open(MODEL_ACTION.UpdateAction.key)
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: MODEL_ACTION.UpdateAction.key,
      icon: <EditOutlined />,
      onClick: onEdit,
      title: MODEL_ACTION.UpdateAction.title,
    },
    {
      cuiKey: MODEL_ACTION.DeleteAction.key,
      icon: <DeleteOutlined />,
      onClick: onDelete,
      title: MODEL_ACTION.DeleteAction.title,
    },
  ]

  return (
    <CuiTreeItem
      icon={
        data.extraData.node.type === IActionKind.CodeAction ? (
          <CodeOutlined />
        ) : (
          <ApiOutlined />
        )
      }
      key={data.key}
      primaryTitle={data.primaryTitle}
      secondaryTitle={data.secondaryTitle}
      toolbar={
        <CuiTreeItemToolbar
          items={toolbarItems}
          title="Actions Tree Item Toolbar"
        />
      }
    />
  )
}
