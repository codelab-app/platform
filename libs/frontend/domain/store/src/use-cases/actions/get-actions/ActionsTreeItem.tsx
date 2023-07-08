import {
  ApiOutlined,
  CodeOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import {
  actionRef,
  type IActionsTreeDataNode,
} from '@codelab/frontend/abstract/core'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { IActionKind } from '@codelab/shared/abstract/core'
import React from 'react'

interface ActionsTreeItemProps {
  data: IActionsTreeDataNode
}

export const ActionsTreeItem = ({ data }: ActionsTreeItemProps) => {
  const { actionService } = useStore()

  const onDelete = () => {
    actionService.deleteModal.open(actionRef(data.node.id))
  }

  const onEdit = () => {
    actionService.updateForm.open(actionRef(data.node.id))
  }

  const toolbarItems = [
    {
      icon: <EditOutlined />,
      key: 'edit-action',
      onClick: onEdit,
      title: 'Edit Action',
    },
    {
      icon: <DeleteOutlined />,
      key: 'delete-action',
      onClick: onDelete,
      title: 'Delete Action',
    },
  ]

  return (
    <CuiTreeItem
      icon={
        data.node.type === IActionKind.CodeAction ? (
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
