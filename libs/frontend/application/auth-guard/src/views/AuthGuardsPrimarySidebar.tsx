'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { CreateAuthGuardPopover } from '../use-cases/create-auth-guard'
import { useCreateAuthGuardForm } from '../use-cases/create-auth-guard/create-auth-guard.state'
import { AuthGuardsTreeView } from '../use-cases/get-auth-guard'

export const AuthGuardsPrimarySidebar = () => {
  const createAuthGuardForm = useCreateAuthGuardForm()
  const { popover } = useCui()

  const items: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.CreateAuthGuardToolbarItem,
      icon: <PlusOutlined />,
      onClick: () => {
        createAuthGuardForm.open()
        popover.open(UiKey.CreateAuthGuardPopover)
      },
      title: 'Add an Auth Guard',
    },
  ]

  return (
    <CuiSidebar
      label="Auth Guards"
      popover={<CreateAuthGuardPopover />}
      uiKey={UiKey.AuthGuardSidebar}
      views={[
        {
          content: <AuthGuardsTreeView />,
          key: 'authGuards',
          label: 'Auth Guards',
          toolbar: { items, title: 'Auth Guards toolbar' },
        },
      ]}
    />
  )
}
