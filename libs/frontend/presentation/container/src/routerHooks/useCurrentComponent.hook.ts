import { useStore } from '@codelab/frontend/application/shared/store'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'

export const useCurrentComponent = () => {
  const { componentService } = useStore()
  const { query } = useRouter()
  const componentSlug = query.componentSlug as string
  const componentName = getNameFromSlug(componentSlug)

  return componentService.componentDomainService.componentList.find(
    ({ name }) => name === componentName,
  )
}
