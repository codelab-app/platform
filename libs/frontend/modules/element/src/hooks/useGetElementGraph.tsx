import { IElementGraph } from '@codelab/shared/abstract/core'
import { values } from 'lodash'
import { useEffect } from 'react'
import { useGetElementsGraphQuery } from '../store'
import { useElementDispatch } from './useElementDispatch'

export const useGetElementGraph = (elementId?: string) => {
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

  if (!elementId) {
    return { elementGraph: undefined }
  }

  const edges = data?.edges || []
  const vertices = data?.vertices ? values(data?.vertices) : []
  const elementGraph = { edges, vertices } as IElementGraph

  return { elementGraph, isLoading }
}
