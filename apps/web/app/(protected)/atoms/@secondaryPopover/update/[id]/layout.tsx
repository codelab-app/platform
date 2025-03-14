import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { use } from 'react'

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const atomDto = await atomRepository.findOne({ id })
  const atomsDto = atomDto ? [atomDto] : []
  const tagsDto = atomDto?.tags ?? []

  return (
    <DomainStoreHydrator atomsDto={atomsDto} tagsDto={tagsDto}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
