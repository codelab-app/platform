import React, { PropsWithChildren } from 'react'
import { PropsWithIds } from '@codelab/frontend'
import { VertexFragmentsFragment, useGetVertexQuery } from '@codelab/generated'

export const VertexContext = React.createContext<VertexFragmentsFragment>(
  undefined!,
)

export const _VertexProvider = ({
  children,
  vertexId,
}: PropsWithChildren<{}> & PropsWithIds<'vertexId'>) => {
  const { data, loading } = useGetVertexQuery({
    variables: {
      input: {
        id: vertexId,
      },
    },
  })

  const vertex = data?.getVertex

  if (loading || !vertex) {
    return null
  }

  console.log('refetching data')

  return (
    <VertexContext.Provider value={{ ...vertex }}>
      {children}
    </VertexContext.Provider>
  )
}

// _VertexProvider.whyDidYouRender = true

export const VertexProvider = React.memo(
  _VertexProvider,
  (prev, next) => prev.vertexId === next.vertexId,
)
