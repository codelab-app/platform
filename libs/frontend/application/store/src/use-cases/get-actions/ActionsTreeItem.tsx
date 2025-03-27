import type { IBuilderRoute } from '@codelab/frontend/abstract/application'
import type {
  IActionNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'

import ApiOutlined from '@ant-design/icons/ApiOutlined'
import CodeOutlined from '@ant-design/icons/CodeOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { IActionKind } from '@codelab/shared/abstract/core'
import { useRouter } from 'next/navigation'
import { mergeDeep } from 'remeda'

import { useActionService } from '../../services/action.service'

interface ActionsTreeItemProps {
  context: IBuilderRoute
  data: ITreeNode<IActionNodeData>
}

export const ActionsTreeItem = ({ context, data }: ActionsTreeItemProps) => {
  const { deletePopover, updatePopover } = useActionService()
  const router = useRouter()
  const actionId = data.extraData.node.id

  const onDelete = () => {
    deletePopover.open(router, mergeDeep(context, { params: { actionId } }))
  }

  const onEdit = () => {
    updatePopover.open(router, mergeDeep(context, { params: { actionId } }))
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.ActionToolbarItemUpdate,
      icon: <EditOutlined />,
      onClick: onEdit,
      title: 'Update Action',
    },
    {
      cuiKey: UiKey.ActionToolbarItemDelete,
      icon: <DeleteOutlined />,
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
