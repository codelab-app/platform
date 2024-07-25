import { useDomainStore } from '@codelab/frontend/infra/mobx'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getNameFromSlug } from '@codelab/shared/utils'

export const useCurrentComponent = () => {
  const { componentDomainService } = useDomainStore()
  const { componentSlug } = useUrl()
  const componentName = getNameFromSlug(componentSlug)

  return componentDomainService.componentList.find(
    ({ name }) => name === componentName,
  )
}
