'use client'

import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import { useUpdateAuthGuardForm } from '../use-cases/update-auth-guard'

export const AuthGuardsViewHeader = () => {
  const updateAuthGuardForm = useUpdateAuthGuardForm()
  const authGuard = updateAuthGuardForm.data?.current

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
}
