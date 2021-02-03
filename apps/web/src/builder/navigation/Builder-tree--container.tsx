import React from 'react'
import { useGetPageData } from '../../useCases/pages/getPage/useGetPageData'
import { BuilderTreeProps } from './Builder-tree'
import {
  CytoscapeService,
  PropsWithIds,
  PropsWithRenderChildren,
  withRouterGuard,
} from '@codelab/frontend'

export const _BuilderTreeContainer = ({
  pageId,
  children,
}: PropsWithRenderChildren<PropsWithIds<'pageId'>, BuilderTreeProps>) => {
  const { layoutGraph, page } = useGetPageData({ pageId })

  if (!layoutGraph || !page) {
    return null
  }

  const cy = CytoscapeService.fromGraph(layoutGraph)
  const root = CytoscapeService.antdTree(cy)

  return <>{children ? <>{children({ data: [root] })}</> : null}</>
}

export const BuilderTreeContainer = withRouterGuard(['pageId'])(
  _BuilderTreeContainer,
)
