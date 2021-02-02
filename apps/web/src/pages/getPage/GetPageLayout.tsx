import { PlusOutlined } from '@ant-design/icons'
import { VertexType } from '@prisma/client'
import { Button } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { makeD3 } from '../../../../../libs/alpha/shared/factory/src/cytoscape.js/factory'
import { dashboardDrawerState } from '../../dashboard/drawer/Dashboard-drawer'
import { D3Graph } from '@codelab/alpha/ui/d3'
import { CytoscapeService, RenderComponents } from '@codelab/frontend'
import {
  GetGraphQuery,
  GetPageGql,
  useAddChildVertexMutation,
} from '@codelab/generated'

interface GetPageLayoutProps {
  graph: GetGraphQuery['getGraph']
  pageId: string
}

export const GetPageLayout = ({ graph, pageId }: GetPageLayoutProps) => {
  const [dashboardDrawer, setDashboardDrawer] = useRecoilState(
    dashboardDrawerState,
  )

  const [addChildVertex] = useAddChildVertexMutation()

  const cy = CytoscapeService.fromGraph(graph)
  const root = CytoscapeService.componentTree(cy)

  const gridContainerId = graph.vertices.find(
    (v) => v.type === VertexType.React_RGL_ResponsiveContainer,
  )?.id

  const onNodeClick = (e: any, node: any) => {
    // console.log(e, node)
    setDashboardDrawer({ visible: true, vertexId: node.id })
  }

  return (
    <>
      <RenderComponents {...root} />
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => {
          if (!gridContainerId) {
            return
          }

          addChildVertex({
            refetchQueries: [
              { query: GetPageGql, variables: { input: { pageId } } },
            ],
            variables: {
              input: {
                parentVertexId: gridContainerId,
                vertex: {
                  type: VertexType.React_RGL_Item,
                },
              },
            },
          })
        }}
      >
        Add Grid
      </Button>
      <D3Graph {...makeD3(graph)} onNodeClick={onNodeClick} />
    </>
  )
}
