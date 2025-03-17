import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useMemo } from 'react'

export const useCurrentComponent = () => {
  const { componentDomainService } = useDomainStore()
  const { componentId } = useUrlPathParams()

  return useMemo(() => {
    const component = componentDomainService.components.get(componentId)

    if (!component) {
      throw new Error('Component not found')
    }

    return component
  }, [componentId, componentDomainService.components])
}
