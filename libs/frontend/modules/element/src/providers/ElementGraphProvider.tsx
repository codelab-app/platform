import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import { ElementGraphFragment } from '../graphql'
import { useGetElementsQuery } from '../store'

export interface ElementGraphContext {
  elementGraph?: ElementGraphFragment
  elementId: string
  elementTree: ElementTree
}

const initialContext: ElementGraphContext = {
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
  const { data } = useGetElementsQuery({
    variables: { where: { id: elementId } },
  })

  const element = data?.elements[0]
  const elementGraph = element?.graph || { edges: [], vertices: [] }
  const elementTree = new ElementTree(elementGraph)

  return (
    <ElementGraphContext.Provider
      value={{ elementId, elementGraph, elementTree }}
    >
      {children}
    </ElementGraphContext.Provider>
  )
}
