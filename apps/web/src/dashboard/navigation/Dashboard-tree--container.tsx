import React from 'react'
import { useGetPageData } from '../../pages/getPage/useGetPageData'
import { DashboardTreeProps } from './Dashboard-tree'
import {
  CytoscapeService,
  PropsWithIds,
  PropsWithRenderChildren,
  withRouterGuard,
} from '@codelab/frontend'

export const _DashboardTreeContainer = ({
  pageId,
  children,
}: PropsWithRenderChildren<PropsWithIds<'pageId'>, DashboardTreeProps>) => {
  const { layoutGraph, page } = useGetPageData({ pageId })

  if (!layoutGraph || !page) {
    return null
  }

  const cy = CytoscapeService.fromGraph(layoutGraph)
  const root = CytoscapeService.antdTree(cy)

  return <>{children ? <>{children({ data: [root] })}</> : null}</>
}

export const DashboardTreeContainer = withRouterGuard(['pageId'])(
  _DashboardTreeContainer,
)
