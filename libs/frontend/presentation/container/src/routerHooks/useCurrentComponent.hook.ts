import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/schema'
import { useMemo } from 'react'

export const useCurrentComponent = () => {
  const { componentDomainService } = useDomainStore()
  const { componentId } = useUrl()

  return useMemo(() => {
    const component = componentDomainService.componentList.find(
      ({ id }) => id === componentId,
    )

    Validator.assertsDefined(component)

    return component
  }, [componentId, componentDomainService.componentList])
}
