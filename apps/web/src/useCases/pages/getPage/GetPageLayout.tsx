import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import {
  AtomType,
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

  const cy = CytoscapeService.fromGraph(graph as any)
  const root = CytoscapeService.componentTree(cy)
  const craftData = CytoscapeService.craftTree(cy)

  // console.log(root)
  // console.log(craftData)

  const gridContainerId = graph.vertices.find(
    (v) => v.type === AtomType.ReactRglResponsiveContainer,
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
                  type: AtomType.ReactRglItem,
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
