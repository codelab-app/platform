import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { Maybe } from '@codelab/shared/abstract/types'
import { useMemo } from 'react'
import { Page, PageService } from '../store'

export const useAppElementTree = (pages: PageService, page: Maybe<Page>) => {
  const currentPageId = useCurrentPageId()
  const providerElementId = page?.providerElementId

  // const {
  //   elementGraph: providerElementGraph,
  //   isLoading: isProviderElementGraphLoading,
  // } = useGetElementGraph(providerElementId)
  //
  // const providerElementTree = useElementTree(providerElementGraph)

  const bottomProviderElement = useMemo(() => {
    // if (isProviderElementGraphLoading) {
    //   return null
    // }
    //
    // const elm = providerElementTree.findFirstDeepestNode()
    //
    // return elm[0]?.data()
  }, []) // [providerElementTree])

  const pageRenderElementGraph = useMemo(() => {
    // if (!pageElementGraph || !pageElementRootId) {
    //   return null
    // }
    //
    // if (!providerElementGraph || !providerElementId || !bottomProviderElement) {
    //   return pageElementGraph
    // }
    //
    // const resultElementGraph = {
    //   vertices: [
    //     ...providerElementGraph.vertices,
    //     ...pageElementGraph.vertices,
    //   ],
    //   edges: [...providerElementGraph.edges, ...pageElementGraph.edges],
    // }
    //
    // resultElementGraph.edges.push({
    //   target: pageElementRootId,
    //   source: bottomProviderElement.id,
    // })
    //
    // return resultElementGraph
  }, []) // [pageElementGraph, providerElementGraph])

  // const appElementTree = useElementTree(pageRenderElementGraph)

  return {
    appElementTree: null!,
  }
}
