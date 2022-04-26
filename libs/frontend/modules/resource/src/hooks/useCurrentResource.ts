import { useCurrentResourceId } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { IResourceService } from '@codelab/shared/abstract/core'
import { useEffect } from 'react'

export const useCurrentResource = (resourcesService: IResourceService) => {
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
