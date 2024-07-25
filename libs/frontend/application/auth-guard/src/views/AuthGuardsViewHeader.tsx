import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend/infra/mobx'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const AuthGuardsViewHeader = observer(() => {
  const { authGuardService } = useStore()
  const authGuard = authGuardService.updateForm.authGuard

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[{ title: 'Auth Guards' }, { title: authGuard?.name || '' }]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          className="size-full"
          preview={false}
          src="/logo.png"
        />
      }
    />
  )
})
