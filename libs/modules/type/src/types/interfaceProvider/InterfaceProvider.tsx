import {
  __InterfaceFragment,
  __TypeFragment,
  useGetInterfaceQuery,
} from '@codelab/codegen/graphql'
import { notify } from '@codelab/frontend/shared'
import _ from 'lodash'
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
    return <>Interface not found</>
  }

  const interfaceTypesById = _.keyBy(
    data.getInterface.fieldCollection.types,
    (t) => t.id,
  )

  return (
    <InterfaceContext.Provider
      value={{ interface: data.getInterface, interfaceTypesById }}
    >
      {children}
    </InterfaceContext.Provider>
  )
}

InterfaceProvider.displayName = 'InterfaceProvider'
