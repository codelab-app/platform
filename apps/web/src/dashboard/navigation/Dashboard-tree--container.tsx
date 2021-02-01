import React from 'react'
import { useGetPageData } from '../../pages/getPage/useGetPageData'
import { DashboardTreeProps } from './Dashboard-tree'
import {
  CytoscapeService,
  PropsWithRenderChildren,
  withRouterGuard,
} from '@codelab/frontend'

export interface DashboardTreeContainerProps {
  pageId: string
}

export const DashboardTreeContainer = withRouterGuard(['pageId'])(
  ({
    pageId,
    children,
  }: PropsWithRenderChildren<
    DashboardTreeContainerProps,
    DashboardTreeProps
  >) => {
    const { layoutGraph, page } = useGetPageData({ pageId })

    if (!layoutGraph || !page) return null

    const cy = CytoscapeService.fromGraph(layoutGraph)
    const root = CytoscapeService.antdTree(cy)

    return <>{children ? <>{children({ data: [root] })}</> : null}</>
  },
)
