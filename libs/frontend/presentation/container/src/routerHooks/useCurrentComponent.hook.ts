import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useMemo } from 'react'

export const useCurrentComponent = () => {
  const { componentDomainService } = useDomainStore()
  const { componentId } = useUrlPathParams()

  return useMemo(() => {
    return componentId ? componentDomainService.component(componentId) : null
  }, [componentId, componentDomainService])
}
