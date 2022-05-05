import { ITypeService } from '@codelab/shared/abstract/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
export const useGetCurrentInterfaceWithFields = (typeService: ITypeService) => {
  const interfaceId = useCurrentInterfaceId()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    typeService.getInterfaceAndDescendants(interfaceId).then(() => {
      console.log('setIsLoading')
      setLoading(false)
    })
  }, [interfaceId])

  return {
    isLoading,
    type: interfaceId
      ? (typeService.type(interfaceId) as InterfaceType)
      : undefined,
  }
}
