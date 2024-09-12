import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import type {
  IAuthGuardNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { authGuardRef } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useDeleteAuthGuardModal } from '../delete-auth-guard/delete-auth-guard.state'
import { useUpdateAuthGuardForm } from '../update-auth-guard'

interface AuthGuardsTreeItemProps {
  data: ITreeNode<IAuthGuardNodeData>
}

export const AuthGuardsTreeItem = observer(
  ({ data }: AuthGuardsTreeItemProps) => {
    const updateAuthGuardForm = useUpdateAuthGuardForm()
    const deleteAuthGuardModal = useDeleteAuthGuardModal()
    const authGuard = data.extraData.node

    const onEdit = () => {
      updateAuthGuardForm.open(authGuardRef(authGuard.id))
    }

    const onDelete = () => {
      deleteAuthGuardModal.open(authGuardRef(authGuard.id))
    }

    const toolbarItems: Array<ToolbarItem> = [
      {
        cuiKey: UiKey.DeleteAuthGuardToolbarItem,
        icon: <DeleteOutlined />,
        onClick: onDelete,
        title: 'Delete',
      },
    ]

    return (
      <CuiTreeItem
        onClick={onEdit}
        primaryTitle={data.primaryTitle}
        toolbar={
          <CuiTreeItemToolbar items={toolbarItems} title="Auth Guard toolbar" />
        }
      />
    )
  },
)
