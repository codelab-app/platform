import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import {
  AtomType,
  paneConfigState,
  PropsWithIds,
} from '@codelab/frontend/shared'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import {
  GetPageGql,
  GraphFragmentsFragment,
  useAddChildVertexMutation,
} from '@codelab/generated'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RenderComponents } from '@codelab/frontend/builder'

type GetPageLayoutProps = {
  graph: GraphFragmentsFragment
} & PropsWithIds<'pageId'>

export const GetPageLayout = ({ graph, pageId }: GetPageLayoutProps) => {
  const [paneConfig, setPaneConfig] = useRecoilState(paneConfigState)

  const [addChildVertex] = useAddChildVertexMutation()

  const cy = CytoscapeService.fromGraph(graph as any)
  const root = CytoscapeService.componentTree(cy)

  // console.log(root)
  // console.log(craftData)

  const gridContainerId = graph.vertices.find(
    (v) => v.type === AtomType.ReactRglResponsiveContainer,
  )?.id

  const onNodeClick = (e: any, node: any) => {
    // console.log(e, node)
    setPaneConfig({ pageElementId: node.id })
  }

  return (
    <>
      <RenderComponents />
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
