import { notify } from '@codelab/frontend/shared'
import { __InterfaceFragment, useGetInterfaceQuery } from '@codelab/graphql'
import React, { useEffect } from 'react'

export interface InterfaceContextType {
  interface: __InterfaceFragment
}

const defaultContext: InterfaceContextType = {
  interface: null!,
}

export const InterfaceContext = React.createContext(defaultContext)

export interface InterfaceProviderProps {
  interfaceId: string
}

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

  return (
    <InterfaceContext.Provider value={{ interface: data.getInterface }}>
      {children}
    </InterfaceContext.Provider>
  )
}

InterfaceProvider.displayName = 'InterfaceProvider'
