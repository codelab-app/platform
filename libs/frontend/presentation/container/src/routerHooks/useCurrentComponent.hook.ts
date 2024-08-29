import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { getNameFromSlug } from '@codelab/shared/utils'

export const useCurrentComponent = () => {
  const { componentDomainService } = useDomainStore()
  const { componentId } = useUrl()
  const componentName = getNameFromSlug(componentId)

  return componentDomainService.componentList.find(
    ({ name }) => name === componentName,
  )
}
