import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const tagDto = await tagRepository.findOne({ id })

  return (
    <DomainStoreHydrator tagsDto={tagDto ? [tagDto] : []}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
