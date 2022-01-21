import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import { ElementGraphFragment } from '../graphql'
import { useGetElementGraphQuery } from '../store'

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

export const ElementGraphProvider = (
  props: React.PropsWithChildren<{ elementId: string }>,
) => {
  const { data } = useGetElementGraphQuery({
    variables: { input: { where: { id: props.elementId } } },
  })

  console.log({ data })

  const elementTree = data?.getElementGraph
    ? new ElementTree(data?.getElementGraph)
    : new ElementTree({ edges: [], vertices: [] })

  return (
    <ElementGraphContext.Provider
      value={{
        elementId: props.elementId,
        elementGraph: data?.getElementGraph,
        elementTree: elementTree,
      }}
    >
      {props.children}
    </ElementGraphContext.Provider>
  )
}
