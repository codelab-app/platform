import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_CRUD } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
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
      icon: <PlusOutlined />,
      key: 'authGuard',
      onClick: () => {
        authGuardService.createForm.open()
        popover.open(MODEL_CRUD.models.AuthGuard.Create.key)
      },
      title: 'Add an Auth Guard',
    },
  ]

  return (
    <CuiSidebar
      label="authGuards"
      popover={<CreateAuthGuardPopover />}
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
