import { useCurrentResourceId } from '@codelab/frontend/presenter/container'
import { IResourceService } from '@codelab/shared/abstract/core'
import { useAsync } from 'react-use'

export const useCurrentResource = (resourcesService: IResourceService) => {
  const resourceId = useCurrentResourceId()

  if (!resourceId) {
    throw new Error('Missing resource id')
  }

  const { loading, error, value } = useAsync(
    () => resourcesService.getOne(resourceId),
    [resourceId],
  )

  return {
    resource: value,
    loading: loading,
    error,
  }
}
