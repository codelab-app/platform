import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const resourceDto = await resourceRepository.findOne({ id })

  return (
    <DomainStoreHydrator
      fallback={<Spinner />}
      resourcesDto={resourceDto ? [resourceDto] : []}
    >
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
