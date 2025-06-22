import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

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
