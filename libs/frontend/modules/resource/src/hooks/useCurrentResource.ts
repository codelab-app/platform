import { useCurrentResourceId } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { useEffect } from 'react'
import { ResourceService } from '../store'

export const useCurrentResource = (resourcesService: ResourceService) => {
  const resourceId = useCurrentResourceId()

  const [getResource, { isLoading, error }] = useLoadingState((id: string) =>
    resourcesService.getOne(id),
  )

  useEffect(() => {
    if (resourceId) {
      getResource(resourceId)
    }
  }, [resourceId, getResource])

  return {
    resource: resourceId ? resourcesService.resource(resourceId) : null,
    isLoading,
    error,
  }
}
