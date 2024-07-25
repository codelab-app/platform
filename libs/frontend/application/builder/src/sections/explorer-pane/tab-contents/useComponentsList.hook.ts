import { useDomainStore } from '@codelab/frontend/infra/mobx'
import type { IComponentDto } from '@codelab/shared/abstract/core'
import { useEffect } from 'react'

export const useComponentsList = (components: Array<IComponentDto>) => {
  const { componentDomainService } = useDomainStore()

  useEffect(() => {
    components.forEach((component) => componentDomainService.hydrate(component))
  }, [componentDomainService, components])

  return componentDomainService.componentList
}
