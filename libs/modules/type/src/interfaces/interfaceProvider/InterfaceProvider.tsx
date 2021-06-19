import { notify } from '@codelab/frontend/shared'
import {
  __InterfaceFragment,
  __TypeFragment,
  useGetInterfaceQuery,
} from '@codelab/graphql'
import React, { useEffect } from 'react'

export interface InterfaceContextType {
  interface: __InterfaceFragment
  interfaceTypesById: Record<string, __TypeFragment>
}

const defaultContext: InterfaceContextType = {
  interface: null!,
  interfaceTypesById: {},
}

export const InterfaceContext = React.createContext(defaultContext)

export interface InterfaceProviderProps {
  interfaceId: string
}

export const extractTypeId = (type: __TypeFragment): string =>
  type.__typename === 'InterfaceType' ? type.interfaceId : type.id

export const InterfaceProvider = ({
  interfaceId,
  children,
}: React.PropsWithChildren<InterfaceProviderProps>) => {
  const { data, loading, error } = useGetInterfaceQuery({
    variables: { input: { interfaceId } },
  })

  useEffect(() => {
    if (error && !loading) {
      notify({
        title: 'Error while getting interface',
        content: error?.message,
        type: 'error',
      })
    }
  }, [error, loading])

  if (!data) {
    return null
  }

  if (!data.getInterface) {
    return 'Interface not found'
  }

  const interfaceTypesById = data.getInterface.fieldCollection.types.reduce<
    InterfaceContextType['interfaceTypesById']
  >((prev, next) => {
    prev[extractTypeId(next)] = next

    return prev
  }, {})

  return (
    <InterfaceContext.Provider
      value={{ interface: data.getInterface, interfaceTypesById }}
    >
      {children}
    </InterfaceContext.Provider>
  )
}

InterfaceProvider.displayName = 'InterfaceProvider'
