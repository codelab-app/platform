import React from 'react'
import { useRecoilState } from 'recoil'
import { dashboardDrawerState } from '../../dashboard/Dashboard-drawer'
import { Renderer } from '@codelab/alpha/core/renderer'
import { makeCytoscape, makeD3 } from '@codelab/alpha/shared/factory'
import { D3Graph } from '@codelab/alpha/ui/d3'
import {
  CytoscapeService,
  renderChildren,
  RenderComponents,
  renderComponents,
} from '@codelab/frontend'
import { GetGraphQuery } from '@codelab/generated'

interface GetPageLayoutProps {
  graph?: GetGraphQuery['getGraph']
}

export const GetPageLayout = ({ graph }: GetPageLayoutProps) => {
  const [dashboardDrawer, setDashboardDrawer] = useRecoilState(
    dashboardDrawerState,
  )

  if (!graph) return null

  // console.log(graph)

  const onNodeClick = (e: any, node: any) => {
    // console.log(e, node)
    setDashboardDrawer({ visible: true, vertexId: node.id })
  }

  const cy = CytoscapeService.fromGraph(graph)

  const root = CytoscapeService.bfs(cy.elements().roots().first())

  console.log(root)

  return (
    <>
      <RenderComponents {...root} />
      {/* <D3Graph {...makeD3(graph)} onNodeClick={onNodeClick} /> */}
    </>
  )
}
