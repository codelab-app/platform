import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import type {
  IAuthGuardNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { authGuardRef } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface AuthGuardsTreeItemProps {
  data: ITreeNode<IAuthGuardNodeData>
}

export const AuthGuardsTreeItem = observer(
  ({ data }: AuthGuardsTreeItemProps) => {
    const { authGuardService } = useStore()
    const authGuard = data.extraData.node

    const onEdit = () => {
      authGuardService.updateForm.open(authGuardRef(authGuard.id))
    }

    const onDelete = () => {
      authGuardService.deleteModal.open(authGuardRef(authGuard.id))
    }

    const toolbarItems: Array<ToolbarItem> = [
      {
        cuiKey: MODEL_ACTION.DeleteAuthGuard.key,
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
