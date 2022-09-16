import { IInterfaceType, ITypeService } from '@codelab/shared/abstract/core'
import { useRouter } from 'next/router'
import { useAsync } from 'react-use'

export const useCurrentInterfaceId = () => {
  const { query } = useRouter()
  const interfaceId = query.interfaceId as string

  if (!interfaceId) {
    console.error(
      'useGetCurrentInterface: No interfaceId found in query params',
    )
  }

  return interfaceId
}

/** Grabs the [interfaceId] from the query params and fetches it, along with its fields */
export const useGetCurrentInterfaceWithFields = (typeService: ITypeService) => {
  const interfaceId = useCurrentInterfaceId()

  const { loading, error } = useAsync(() => {
    // We need the whole graph, not just the interface, because we need to reference all the field types
    return typeService.getInterfaceAndDescendants(interfaceId)
  }, [interfaceId])

  return {
    loading,
    error,
    type: interfaceId
      ? (typeService.type(interfaceId) as IInterfaceType)
      : undefined,
  }
}
