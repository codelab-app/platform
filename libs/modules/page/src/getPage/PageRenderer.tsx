import {
  nodeRendererFactory,
  useComponentHandlers,
} from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { ComponentItemType } from '@codelab/frontend/shared'
import { Core } from 'cytoscape'
import React from 'react'

type GetPageLayoutProps = {
  cy: Core
}

export const PageRenderer = ({ cy }: GetPageLayoutProps) => {
  // const [addPageElement] = useCreatePageElementMutation({
  //   refetchQueries: [refetchGetPageQuery({ input: { pageId } })],
  // })

  const root = CytoscapeService.componentTree(cy)

  const handleDroppedComponent = ({ key, label }: ComponentItemType) => {
    // addPageElement({
    //   variables: {
    //     input: {
    //       page_id: page.id,
    //       component_id: key,
    //       name: `${label}`,
    //     },
    //   },
    // })
  }

  const handlers = useComponentHandlers()

  return (
    <>
      {/*<ComponentDropHandler onDropped={handleDroppedComponent} root={root }>*/}
      {nodeRendererFactory(root, { handlers })}
      {/*<ComponentElementRenderer node={root} />*/}
      {/*</ComponentDropHandler>*/}

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
