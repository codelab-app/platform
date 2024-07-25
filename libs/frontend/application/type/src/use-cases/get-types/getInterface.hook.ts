import type { ITypeService } from '@codelab/frontend/abstract/application'
import type { IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { useAsync } from '@react-hookz/web'
import { useEffect } from 'react'

export const useCurrentInterfaceId = () => {
  const { params, query } = useUrl()
  const interfaceId = params?.interfaceId

  if (!interfaceId) {
    throw new Error(
      'useGetCurrentInterface: No interfaceId found in query params',
    )
  }

  return interfaceId
}

/** Grabs the [interfaceId] from the query params and fetches it, along with its fields */
export const useGetCurrentInterfaceWithFields = (typeService: ITypeService) => {
  const interfaceId = useCurrentInterfaceId()

  const [{ error, status }, getInterface] = useAsync(() =>
    // We need the whole graph, not just the interface, because we need to reference all the field types
    typeService.getInterface(interfaceId),
  )

  useEffect(() => {
    void getInterface.execute()
  }, [interfaceId])

  return {
    error,
    loading: status === 'loading',
    type:
      interfaceId && status !== 'loading'
        ? (typeService.getType(interfaceId) as IInterfaceTypeModel)
        : undefined,
  }
}
