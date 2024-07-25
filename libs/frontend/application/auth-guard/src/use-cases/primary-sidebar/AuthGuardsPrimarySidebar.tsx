import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/infra/mobx'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateAuthGuardPopover } from '../create-auth-guard'
import { AuthGuardsTreeView } from '../get-auth-guard'

export const AuthGuardsPrimarySidebar = observer(() => {
  const { authGuardService } = useStore()
  const { popover } = useCui()

  const items: Array<ToolbarItem> = [
    {
      cuiKey: MODEL_ACTION.CreateAuthGuard.key,
      icon: <PlusOutlined />,
      onClick: () => {
        authGuardService.createForm.open()
        popover.open(MODEL_ACTION.CreateAuthGuard.key)
      },
      title: 'Add an Auth Guard',
    },
  ]

  return (
    <CuiSidebar
      label="Auth Guards"
      popover={<CreateAuthGuardPopover />}
      uiKey={MODEL_UI.SidebarAuthGuard.key}
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
})
