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
import { FormNames } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { IActionKind } from '@codelab/shared/abstract/core'
import React from 'react'

interface ActionsTreeItemProps {
  data: IActionsTreeDataNode
}

export const ActionsTreeItem = ({ data }: ActionsTreeItemProps) => {
  const { actionService } = useStore()
  const { popover } = useCui()

  const onDelete = () => {
    actionService.deleteModal.open(actionRef(data.extraData.node.id))
  }

  const onEdit = () => {
    actionService.updateForm.open(actionRef(data.extraData.node.id))
    popover.open(FormNames.UpdateAction)
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
