import type { LayoutProps } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'

const Layout = async ({ children, params }: LayoutProps<'resourceId'>) => {
  const { resourceId } = await params
  const resourceDto = await resourceRepository.findOne({ id: resourceId })

  return (
    <DomainStoreHydrator resourcesDto={resourceDto ? [resourceDto] : []}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
