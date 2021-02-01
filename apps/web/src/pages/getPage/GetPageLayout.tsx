import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { dashboardDrawerState } from '../../dashboard/Dashboard-drawer'
import { CytoscapeService, RenderComponents } from '@codelab/frontend'
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
      <Button icon={<PlusOutlined />} type="primary">
        Add Grid
      </Button>
      {/* <D3Graph {...makeD3(graph)} onNodeClick={onNodeClick} /> */}
    </>
  )
}
