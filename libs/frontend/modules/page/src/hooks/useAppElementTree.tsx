import {
  useElementGraphContext,
  useElementTree,
  useGetElementGraph,
} from '@codelab/frontend/modules/element'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { useMemo } from 'react'
import { PageStore } from '..'
import { usePage } from '.'

export const useAppElementTree = (pages: PageStore) => {
  const currentPageId = useCurrentPageId()
  const { page } = usePage(currentPageId, pages)

  const { elementGraph: pageElementGraph, elementId: pageElementRootId } =
    useElementGraphContext()

  const providerElementId = page?.providerElementId

  const {
    elementGraph: providerElementGraph,
    isLoading: isProviderElementGraphLoading,
  } = useGetElementGraph(providerElementId)

  const providerElementTree = useElementTree(providerElementGraph)

  const bottomProviderElement = useMemo(() => {
    if (isProviderElementGraphLoading) {
      return null
    }

    const elm = providerElementTree.findFirstDeepestNode()

    return elm[0]?.data()
  }, [providerElementTree])

  const pageRenderElementGraph = useMemo(() => {
    if (!pageElementGraph || !pageElementRootId) {
      return null
    }

    if (!providerElementGraph || !providerElementId || !bottomProviderElement) {
      return pageElementGraph
    }

    const resultElementGraph = {
      vertices: [
        ...providerElementGraph.vertices,
        ...pageElementGraph.vertices,
      ],
      edges: [...providerElementGraph.edges, ...pageElementGraph.edges],
    }

    resultElementGraph.edges.push({
      target: pageElementRootId,
      source: bottomProviderElement.id,
    })

    return resultElementGraph
  }, [pageElementGraph, providerElementGraph])

  const appElementTree = useElementTree(pageRenderElementGraph)

  return {
    appElementTree,
  }
}
