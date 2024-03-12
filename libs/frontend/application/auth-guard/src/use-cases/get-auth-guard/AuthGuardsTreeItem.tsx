import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import type { IAuthGuardsTreeDataNode } from '@codelab/frontend/abstract/domain'
import { authGuardRef } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface AuthGuardsTreeItemProps {
  data: IAuthGuardsTreeDataNode
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

    const toolbarItems = [
      {
        icon: <DeleteOutlined />,
        key: MODEL_ACTION.DeleteAuthGuard.key,
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
