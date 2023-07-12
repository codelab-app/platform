import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'
import { useStore } from '../providers'

export const useCurrentComponent = () => {
  const { componentService } = useStore()
  const { query } = useRouter()
  const componentSlug = query.componentSlug as string
  const componentName = getNameFromSlug(componentSlug)
  const { componentList } = componentService
  const component = componentList.find(({ name }) => name === componentName)

  return { component, componentName, componentSlug }
}
