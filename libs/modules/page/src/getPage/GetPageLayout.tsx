import React from 'react'
import { useRecoilState } from 'recoil'
import { paneConfigState } from '@codelab/frontend/shared'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { RenderComponents } from '@codelab/frontend/builder'
import { RootApp__PageFragment } from '@codelab/hasura'

type GetPageLayoutProps = {
  page: RootApp__PageFragment
}

export const GetPageLayout = ({ page }: GetPageLayoutProps) => {
  const [paneConfig, setPaneConfig] = useRecoilState(paneConfigState)

  // const [addChildVertex] = useAddChildVertexMutation()

  const cy = CytoscapeService.fromPage(page)
  const root = CytoscapeService.componentTree(cy)

  const onNodeClick = (e: any, node: any) => {
    // console.log(e, node)
    setPaneConfig({ pageElementId: node.id })
  }

  console.log(root)

  return (
    <>
      <RenderComponents node={root} />

      {/*<Button*/}
      {/*  icon={<PlusOutlined />}*/}
      {/*  type="primary"*/}
      {/*  onClick={() => {*/}
      {/*    if (!gridContainerId) {*/}
      {/*      return*/}
      {/*    }*/}

      {/*    addChildVertex({*/}
      {/*      refetchQueries: [*/}
      {/*        { query: GetPageGql, variables: { input: { pageId } } },*/}
      {/*      ],*/}
      {/*      variables: {*/}
      {/*        input: {*/}
      {/*          parentVertexId: gridContainerId,*/}
      {/*          vertex: {*/}
      {/*            type: AtomType.ReactRglItem,*/}
      {/*          },*/}
      {/*        },*/}
      {/*      },*/}
      {/*    })*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Add Grid*/}
      {/*</Button>*/}
      {/* <D3Graph {...makeD3(graph)} onNodeClick={onNodeClick} /> */}
    </>
  )
}
