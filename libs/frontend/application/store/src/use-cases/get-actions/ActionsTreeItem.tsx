import ApiOutlined from '@ant-design/icons/ApiOutlined'
import CodeOutlined from '@ant-design/icons/CodeOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import type {
  IActionNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { IActionKind } from '@codelab/shared/abstract/core'
import { useDeleteActionModal } from '../delete-action'
import { useUpdateActionForm } from '../update-action'

interface ActionsTreeItemProps {
  data: ITreeNode<IActionNodeData>
}

export const ActionsTreeItem = ({ data }: ActionsTreeItemProps) => {
  const deleteActionModal = useDeleteActionModal()
  const updateActionForm = useUpdateActionForm()
  const { popover } = useCui()

  const onDelete = () => {
    deleteActionModal.open(data.extraData.node)
  }

  const onEdit = () => {
    updateActionForm.open(data.extraData.node)
    popover.open(UiKey.UpdateActionPopover)
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.UpdateActionToolbarItem,
      icon: <EditOutlined />,
      onClick: onEdit,
      title: 'Update Action',
    },
    {
      cuiKey: UiKey.DeleteActionToolbarItem,
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
