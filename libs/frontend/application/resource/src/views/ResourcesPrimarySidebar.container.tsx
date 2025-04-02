'use client'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { ResourcesPrimarySidebar } from './ResourcesPrimarySidebar'

export const ResourcesPrimarySidebarContainer = observer(() => {
  const { resourceDomainService } = useDomainStore()

  return (
    <ResourcesPrimarySidebar resources={resourceDomainService.resourceList} />
  )
})
