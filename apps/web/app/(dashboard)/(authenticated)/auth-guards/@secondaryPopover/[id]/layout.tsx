import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'

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
    <DomainStoreHydrator
      authGuardsDto={authGuardDto ? [authGuardDto] : []}
      fallback={<Spinner />}
    >
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
