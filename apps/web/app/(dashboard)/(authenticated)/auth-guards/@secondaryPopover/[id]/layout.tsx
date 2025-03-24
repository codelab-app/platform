import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const authGuardDto = await authGuardRepository.findOne({ id })

  return (
    <DomainStoreHydrator authGuardsDto={authGuardDto ? [authGuardDto] : []}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
