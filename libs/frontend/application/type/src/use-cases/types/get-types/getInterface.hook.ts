import type {
  IInterfaceType,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { useAsync } from '@react-hookz/web'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
        ? (typeService.type(interfaceId) as IInterfaceType)
        : undefined,
  }
}
