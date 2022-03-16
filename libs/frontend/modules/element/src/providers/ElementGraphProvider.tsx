import { IElementGraph } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { values } from 'lodash'
import React, { useEffect } from 'react'
import { useElementDispatch } from '../hooks'
import { useGetElementsGraphQuery } from '../store'
import { useElementTree } from '../tree'

export interface IElementGraphContext {
  elementGraph?: IElementGraph
  elementId?: string
  elementTree: ElementTree
}

const initialContext: IElementGraphContext = {
  elementGraph: undefined,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  elementId: undefined!,
  elementTree: new ElementTree({ edges: [], vertices: [] }),
}

const ElementGraphContext = React.createContext(initialContext)

export const useElementGraphContext = () =>
  React.useContext(ElementGraphContext)

type ElementGraphProviderProps = React.PropsWithChildren<{ elementId?: string }>

export const ElementGraphProvider = ({
  elementId,
  children,
}: ElementGraphProviderProps) => {
  const { data, isLoading } = useGetElementsGraphQuery(
    {
      variables: { input: { rootId: String(elementId) } },
    },
    {
      skip: !elementId,
    },
  )

  const { setCurrentGraphRoot } = useElementDispatch()

  useEffect(() => {
    setCurrentGraphRoot({ rootElementId: elementId })
  }, [elementId, setCurrentGraphRoot])

  const edges = data?.edges || []
  const vertices = data?.vertices ? values(data?.vertices) : []
  const elementGraph = { edges, vertices }
  const elementTree = useElementTree(elementGraph)

  if (isLoading) {
    return null
  }

  return (
    <ElementGraphContext.Provider
      value={{ elementId, elementGraph, elementTree }}
    >
      {children}
    </ElementGraphContext.Provider>
  )
}
