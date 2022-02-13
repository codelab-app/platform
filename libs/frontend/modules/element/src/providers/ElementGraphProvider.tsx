import { ElementTree } from '@codelab/shared/core'
import { values } from 'lodash'
import React, { useEffect } from 'react'
import { ElementGraphFragment } from '../graphql'
import { useElementDispatch } from '../hooks'
import { useGetElementsGraphQuery } from '../store'
import { useElementTree } from '../tree'

export interface IElementGraphContext {
  elementGraph?: ElementGraphFragment
  elementId: string
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

type ElementGraphProviderProps = React.PropsWithChildren<{ elementId: string }>

export const ElementGraphProvider = ({
  elementId,
  children,
}: ElementGraphProviderProps) => {
  const { data } = useGetElementsGraphQuery({
    variables: { input: { rootId: elementId } },
  })

  console.log(data)

  const { setCurrentGraphRoot } = useElementDispatch()

  useEffect(() => {
    setCurrentGraphRoot({ rootElementId: elementId })
  }, [elementId, setCurrentGraphRoot])

  const edges = data?.edges || []
  const vertices = data?.vertices ? values(data?.vertices) : []
  const elementGraph = { edges, vertices }
  const elementTree = useElementTree(elementGraph)

  return (
    <ElementGraphContext.Provider
      value={{ elementId, elementGraph, elementTree }}
    >
      {children}
    </ElementGraphContext.Provider>
  )
}
