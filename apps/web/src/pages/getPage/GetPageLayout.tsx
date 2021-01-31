import React from 'react'
import { useRecoilState } from 'recoil'
import { dashboardDrawerState } from '../../dashboard/Dashboard-drawer'
import { makeCytoscape, makeD3 } from '@codelab/alpha/shared/factory'
import { D3Graph } from '@codelab/alpha/ui/d3'
import { GetGraphQuery } from '@codelab/generated'

interface GetPageLayoutProps {
  graph?: GetGraphQuery['getGraph']
}

export const GetPageLayout = ({ graph }: GetPageLayoutProps) => {
  const [dashboardDrawer, setDashboardDrawer] = useRecoilState(
    dashboardDrawerState,
  )

  if (!graph) return null

  const cy = makeCytoscape(graph)

  // console.log(cy.elements())

  // return Renderer.graphComponents({ graph })
  const onNodeClick = (e: any, node: any) => {
    // console.log(e, node)
    setDashboardDrawer({ visible: true, vertexId: node.id })
  }

  return <D3Graph {...makeD3(graph)} onNodeClick={onNodeClick} />
}
