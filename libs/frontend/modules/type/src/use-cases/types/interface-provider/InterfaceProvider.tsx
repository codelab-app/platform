import { notify } from '@codelab/frontend/shared/utils'
import { TypeTree } from '@codelab/shared/core'
import React, { useEffect } from 'react'
import { InterfaceFragment } from '../../../graphql/Interface.fragment.graphql.gen'
import { TypeGraphFragment } from '../../../graphql/TypeGraph.fragment.graphql.gen'
import { useTypeTree } from '../../../hooks'
import { useGetTypeGraphQuery, useGetTypeQuery } from '../../../store'

export interface InterfaceContextType {
  interface: InterfaceFragment
  interfaceGraph: TypeGraphFragment
  tree: TypeTree
}

const defaultContext: InterfaceContextType = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  interface: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  interfaceGraph: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tree: null!,
}

export const InterfaceContext = React.createContext(defaultContext)

export interface InterfaceProviderProps {
  interfaceId: string
}

const useInterfaceProviderQueries = (interfaceId: string) => {
  const interfaceQuery = useGetTypeQuery({
    variables: { input: { where: { id: interfaceId } } },
  })

  const graphQuery = useGetTypeGraphQuery({
    variables: { input: { where: { id: interfaceId } } },
  })

  useEffect(() => {
    if (interfaceQuery.error && !interfaceQuery.isLoading) {
      notify({
        title: 'Error while getting interface',
        content: (interfaceQuery.error as any)?.message,
        type: 'error',
      })
    }
  }, [interfaceQuery])

  useEffect(() => {
    if (graphQuery.error && !graphQuery.isLoading) {
      notify({
        title: 'Error while getting interface graph',
        content: (graphQuery.error as any)?.message,
        type: 'error',
      })
    }
  }, [graphQuery])

  return { interfaceQuery, graphQuery }
}

export const InterfaceProvider = ({
  interfaceId,
  children,
}: React.PropsWithChildren<InterfaceProviderProps>) => {
  const { interfaceQuery, graphQuery } =
    useInterfaceProviderQueries(interfaceId)

  const tree = useTypeTree(graphQuery.data?.getTypeGraph)

  if (
    !graphQuery.data ||
    !graphQuery.data.getTypeGraph ||
    !interfaceQuery.data ||
    !interfaceQuery.data.getType
  ) {
    return null
  }

  if (interfaceQuery.data.getType.__typename !== 'InterfaceType') {
    throw new Error(
      'interfaceId provided to InterfaceProvider is not of type InterfaceType, but is ' +
        interfaceQuery.data.getType.__typename,
    )
  }

  return (
    <InterfaceContext.Provider
      value={{
        interface: interfaceQuery.data.getType,
        interfaceGraph: graphQuery.data.getTypeGraph,
        tree,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  )
}

InterfaceProvider.displayName = 'InterfaceProvider'
