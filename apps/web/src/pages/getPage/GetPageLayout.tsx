import { PlusOutlined } from '@ant-design/icons'
import { VertexType } from '@prisma/client'
import { Button } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { dashboardDrawerState } from '../../dashboard/Dashboard-drawer'
import { CytoscapeService, RenderComponents } from '@codelab/frontend'
import {
  GetGraphQuery,
  GetPageGql,
  useAddChildVertexMutation,
} from '@codelab/generated'

interface GetPageLayoutProps {
  graph?: GetGraphQuery['getGraph']
  pageId: string
}

export const GetPageLayout = ({ graph, pageId }: GetPageLayoutProps) => {
  const [dashboardDrawer, setDashboardDrawer] = useRecoilState(
    dashboardDrawerState,
  )

  const [addChildVertex] = useAddChildVertexMutation()

  if (!graph) return null

  const cy = CytoscapeService.fromGraph(graph)

  const root = CytoscapeService.bfs(cy.elements().roots().first())

  const gridContainerId = graph.vertices.find(
    (v) => v.type === VertexType.React_Grid_ResponsiveLayout,
  )?.id

  return (
    <>
      <RenderComponents {...root} />
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => {
          if (!gridContainerId) return

          addChildVertex({
            refetchQueries: [
              { query: GetPageGql, variables: { input: { pageId } } },
            ],
            variables: {
              input: {
                parentVertexId: gridContainerId,
                vertex: {
                  type: VertexType.React_Grid,
                },
              },
            },
          })
        }}
      >
        Add Grid
      </Button>
      {/* <D3Graph {...makeD3(graph)} onNodeClick={onNodeClick} /> */}
    </>
  )
}
