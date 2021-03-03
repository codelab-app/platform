import { PlusOutlined } from '@ant-design/icons'
import { VertexType } from '@prisma/client'
import { Button } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import {
  CytoscapeService,
  PropsWithIds,
  RenderComponents,
} from '@codelab/frontend'
import {
  GetPageGql,
  GraphFragmentsFragment,
  useAddChildVertexMutation,
} from '@codelab/generated'
import { paneConfigState } from 'apps/web/src/pages/builder/pane-config/Pane-config'

type GetPageLayoutProps = {
  graph: GraphFragmentsFragment
} & PropsWithIds<'pageId'>

export const GetPageLayout = ({ graph, pageId }: GetPageLayoutProps) => {
  const [paneConfig, setPaneConfig] = useRecoilState(paneConfigState)

  const [addChildVertex] = useAddChildVertexMutation()

  const cy = CytoscapeService.fromGraph(graph)
  const root = CytoscapeService.componentTree(cy)
  const craftData = CytoscapeService.craftTree(graph)

  console.log(root)
  // console.log(craftData)

  const gridContainerId = graph.vertices.find(
    (v) => v.type === VertexType.React_RGL_ResponsiveContainer,
  )?.id

  const onNodeClick = (e: any, node: any) => {
    // console.log(e, node)
    setPaneConfig({ vertexId: node.id })
  }

  return (
    <>
      <RenderComponents node={root} data={craftData} />
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => {
          console.log(gridContainerId)
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
      {/* <D3Graph {...makeD3(graph)} onNodeClick={onNodeClick} /> */}
    </>
  )
}
