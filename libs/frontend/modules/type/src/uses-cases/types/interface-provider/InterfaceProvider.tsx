import { notify } from '@codelab/frontend/shared/utils'
import {
  __InterfaceFragment,
  __TypeGraphFragment,
  useGetTypeGraphQuery,
  useGetTypeQuery,
} from '@codelab/shared/codegen/graphql'
import { ITypeTree } from '@codelab/shared/graph'
import React, { useEffect } from 'react'
import { useTypeTree } from '../../../type-tree'

export interface InterfaceContextType {
  interface: __InterfaceFragment
  interfaceGraph: __TypeGraphFragment
  tree: ITypeTree
}

const defaultContext: InterfaceContextType = {
  interface: null!,
  interfaceGraph: null!,
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
    if (interfaceQuery.error && !interfaceQuery.loading) {
      notify({
        title: 'Error while getting interface',
        content: interfaceQuery.error?.message,
        type: 'error',
      })
    }
  }, [interfaceQuery])

  useEffect(() => {
    if (graphQuery.error && !graphQuery.loading) {
      notify({
        title: 'Error while getting interface graph',
        content: graphQuery.error?.message,
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

  const tree = useTypeTree(
    graphQuery.data
      ? graphQuery.data.getTypeGraph
      : { edges: [], vertices: [] },
  )

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
