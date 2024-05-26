import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useParams, useRouter } from 'next/navigation'

export const useCurrentComponent = () => {
  const { componentService } = useStore()
  const params = useParams()
  const componentSlug = params.componentSlug as string
  const componentName = getNameFromSlug(componentSlug)

  return componentService.componentDomainService.componentList.find(
    ({ name }) => name === componentName,
  )
}
