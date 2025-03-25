import type { LayoutProps } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'

const Layout = async ({ children, params }: LayoutProps<'authGuardId'>) => {
  const { authGuardId } = await params
  const authGuardDto = await authGuardRepository.findOne({ id: authGuardId })

  return (
    <DomainStoreHydrator authGuardsDto={authGuardDto ? [authGuardDto] : []}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
