'use client'

import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebar } from '@codelab/frontend/presentation/codelab-ui'
import { useRouter } from 'next/navigation'

import { useAuthGuardService } from '../services'
import { AuthGuardsTreeView } from '../use-cases/get-auth-guard'

export const AuthGuardsPrimarySidebar = () => {
  const { createPopover } = useAuthGuardService()
  const router = useRouter()

  const items: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.AuthGuardToolbarItemCreate,
      icon: <PlusOutlined />,
      onClick: () => createPopover.open(router),
      title: 'Add an Auth Guard',
    },
  ]

  return (
    <CuiSidebar
      label="Auth Guards"
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
