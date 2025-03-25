import type {
  IAuthGuardNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import type { SyntheticEvent } from 'react'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAuthGuardService } from '../../services/auth-guard.service'

interface AuthGuardsTreeItemProps {
  data: ITreeNode<IAuthGuardNodeData>
}

export const AuthGuardsTreeItem = observer(
  ({ data }: AuthGuardsTreeItemProps) => {
    const { updatePopover } = useAuthGuardService()
    const router = useRouter()
    const authGuard = data.extraData.node
    const onEdit = () => updatePopover.open(router, { id: authGuard.id })

    const onDelete = (event: SyntheticEvent) => {
      // Prevent triggering `onEdit`
      event.stopPropagation()

      router.push(RoutePaths.AuthGuardsDelete(authGuard))
    }

    const toolbarItems: Array<ToolbarItem> = [
      {
        cuiKey: UiKey.AuthGuardToolbarItemDelete,
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
