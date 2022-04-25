import { useLoadingState } from '@codelab/frontend/shared/utils'
import { ITypeService } from '@codelab/shared/abstract/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { InterfaceType } from '../../../store'

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
export const useGetCurrentInterfaceWithFields = (typeStore: ITypeService) => {
  const interfaceId = useCurrentInterfaceId()

  const [getOne, { isLoading, error }] = useLoadingState((_id: string) =>
    // We need the whole graph, not just the interface, because we need to reference all the field types
    typeStore.getInterfaceAndDescendants(_id),
  )

  useEffect(() => {
    if (interfaceId) {
      getOne(interfaceId)
    }
  }, [interfaceId, getOne])

  return {
    isLoading,
    error,
    type: interfaceId
      ? (typeStore.type(interfaceId) as InterfaceType | undefined)
      : undefined,
  }
}
