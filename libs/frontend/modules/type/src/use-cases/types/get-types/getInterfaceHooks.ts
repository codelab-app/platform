import { useRouter } from 'next/router'
import {
  useGetInterfaceTypeGraphsQuery,
  useGetInterfaceTypesQuery,
  useGetInterfaceTypesWithFieldsQuery,
} from '../../../store/getType.endpoints'

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

const interfaceWhereId = (id: string) => ({ variables: { where: { id } } })

/** Grabs the [interfaceId] from the query params and fetches it */
export const useGetCurrentInterface = () => {
  const interfaceId = useCurrentInterfaceId()

  return useGetInterfaceTypesQuery(interfaceWhereId(interfaceId), {
    skip: !interfaceId,
    selectFromResult: (r) => ({
      type: r.data?.types?.[0],
      isLoading: r?.isLoading,
      interfaceId,
    }),
  })
}

/** Grabs the [interfaceId] from the query params and fetches it, along with its fields */
export const useGetCurrentInterfaceWithFields = () => {
  const interfaceId = useCurrentInterfaceId()

  return useGetInterfaceTypesWithFieldsQuery(interfaceWhereId(interfaceId), {
    skip: !interfaceId,
    selectFromResult: (r) => {
      return { type: r.data?.types?.[0], isLoading: r?.isLoading, interfaceId }
    },
  })
}

/** Grabs the [interfaceId] from the query params and fetches it, along with its fields */
export const useGetCurrentInterfaceGraph = () => {
  const interfaceId = useCurrentInterfaceId()

  return useGetInterfaceTypeGraphsQuery(interfaceWhereId(interfaceId), {
    skip: !interfaceId,
    selectFromResult: (r) => ({
      type: r.data?.types?.[0],
      isLoading: r?.isLoading,
      interfaceId,
    }),
  })
}
