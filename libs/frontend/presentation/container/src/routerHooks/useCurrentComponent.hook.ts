import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getNameFromSlug } from '@codelab/shared/utils'

export const useCurrentComponent = () => {
  const { componentService } = useStore()
  const { componentSlug } = useUrl()
  const componentName = getNameFromSlug(componentSlug)

  return componentService.componentDomainService.componentList.find(
    ({ name }) => name === componentName,
  )
}
